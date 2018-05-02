import moment from 'moment';
import util from 'util';

export default class TelemetryDataStore {

    constructor(bufferSize=100) {
        this.dataQueues = {};
        this.bufferSize = bufferSize;
        this.addDataToStore = this.addDataToStore.bind(this);
        this.processReceivedData = this.processReceivedData.bind(this);
    }

    addDataToStore(topicName, bundle) {
        // Check if this is the first time we've tried to add a bundle of this type
        if (!this.dataQueues.hasOwnProperty(topicName)) {
            this.dataQueues[topicName] = new DataQueue(this.bufferSize);
        }
        // Enqueue the bundle
        this.dataQueues[topicName].enqueue(bundle);
    }

    processReceivedData(msg) {
        // Convert the timestamp string into a moment object
        let timestamp = moment(msg.timestamp);

        let dataBundle = new DataBundle(timestamp, msg.type, msg.data);
        if (process.env.DEBUG) {
            console.log(util.inspect(dataBundle));
        }
        this.addDataToStore(msg.topicName, dataBundle);
        if (process.env.DEBUG) {
            console.log('Data store size: ' + this.dataQueues[msg.topicName].size);
        }
    }

}

export class DataBundle {
    constructor(timestamp, dataType, dataValue) {
        this.timestamp = timestamp;
        this.type = dataType;
        this.value = dataValue;
    }
}

class DataQueue {

    constructor(maxSize=100) {
        this.head = null; // Front of the queue (where items are added)
        this.tail = null; // Back of the queue (where items get discarded)
        this.size = 0;
        this.maxSize = maxSize;
    }

    /**
     * Adds a new item to the queue, dropping the tail item if the maximum queue size has been reached.
     * @param {object} item: an item to add to the queue
     */
    enqueue(item) {
        let newNode = new Node(this.head, item);
        if (this.head === null) { // Adding the first item
            this.head = newNode;
            this.tail = newNode;
        } else { // Adding an item to a list with at least one item already in it
            this.tail.prev = newNode;
            this.tail = newNode;
            ++this.size;

            // Check if we need to drop an item
            while (this.size > this.maxSize) {
                this.dequeue();
            }
        }
    }

    /**
     * Removes an item from the queue.
     * @return {object} the value removed from the queue
     */
    dequeue() {
        let item = this.head.value;
        this.head = this.head.prev;
        this.head.next = null;
        --this.size;
        return item;
    }

    /**
     * Get the newest items from the queue without removing them.
     * @param {number} itemCount: the maximum number of items to remove
     * @return {Array} the most recent items added to the queue
     */
    peek(itemCount) {
        let res = [];
        let curNode = this.head;
        for (let i = 0; i < itemCount && curNode !== null; ++i) {
            res.push(curNode.value);
            curNode = curNode.next;
        }
        return res;
    }
}

/**
 * A node for the linked list used in DataQueue.
 */
class Node {
    constructor(prevNode, value) {
        this.prev = prevNode;
        this.value = value;
        this.next = null;
    }
}