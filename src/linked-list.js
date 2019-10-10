const Node = require('./node');

class LinkedList {
    constructor() {        
        this._tail = null; 
        this._head = null;
        this.length = 0;       
    }

    append(data) {
        let node = new Node(data);

        if (this.length === 0) {       
            this._tail = node;
            this._head = node;
            this.length++;
            return this;
        } else {                        
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
            this.length++;
            return this;          
        }
    }

    head() {
        return this._head.data;    
    }

    tail() {
        return this._tail.data;     
    }

    at(index) {
        let current = this._head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        
        return current.data;
    }

    insertAt(index, data) {        
        let node = new Node(data);
        let current = this._head;

        for (let i = 0; i <= index; i++) {
            if (i === index) {                      
                current.prev = node;
                node.next = current;
            } else {                                
                current = current.next;
            }  
        }

        let currentNew = this._head;

        for (let i = 0; i < index; i++) {
            if (i === index - 1) {             //reconnection of nodes 
                currentNew.next = node;
                node.prev = currentNew;
            } else {
                currentNew = currentNew.next;
            }  
        }

        this.length++;

        return this;
    }

    isEmpty() {
        if (this.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    clear() {
        this._head.data = null;
        this._tail.data = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let current = this._head;

        for (let i = 0; i <= index; i++) {
            current = current.next;
        }                                           //in the next position from the deleted node

        let currentNew = this._head;
        for (let i = 0; i < index; i++) {
            if (i === index - 1) {
                currentNew.next = current;
                current.prev = currentNew;          //connect node(index+1) and node(index-1)
            } else {
                currentNew = currentNew.next;       //go through the list
            }
        }

        this.length--;

        return this;
    }

    reverse() {
        let current = this._head;
        let array = [];

        for (let i = 0; i < this.length; i++) {
            array.unshift(current.data);
            current = current.next;
        }                                            //create an array with reverse list's datas

        this.clear();

        array.forEach((value) => {this.append(value)});

        return this;
    }

    indexOf(data) {
        let current = this._head;
        
        for (let i = 0; i < this.length; i++) {
            if (current.data === data) {
                return i;
            } else if (i === this.length-1) {      //on the last iteration return -1, if list doesn't contain data
                return -1;
            }

            current = current.next;
        }
    }
}

module.exports = LinkedList;
