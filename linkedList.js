class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  getSize() {
    return this.length;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  prepend(item) {
    const node = new Node(item);

    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  insertAt(idx, item) {
    if (idx > this.length) {
      throw new Error("Index out of bounds");
    }

    if (idx === this.length) {
      this.append(item);
      return;
    } else if (idx === 0) {
      this.prepend(item);
      return;
    }

    this.length++;
    const curr = this.getAtLogic(idx);
    const node = new Node(item);

    node.next = curr;
    node.prev = curr.prev;
    curr.prev.next = node;
    curr.prev = node;
  }

  append(item) {
    this.length++;
    const node = new Node(item);
    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;

    this.tail = node;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }

    return this.removeNodeLogic(this.tail);
  }

  remove(item) {
    let curr = this.head;

    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.item === item) {
        break;
      }
      curr = curr.next;
    }

    if (!curr) {
      return undefined;
    }

    return this.removeNodeLogic(curr);
  }

  at(idx) {
    return `[ ${this.getAtLogic(idx)?.item} ]`;
  }

  removeAt(idx) {
    const node = this.getAtLogic(idx);

    if (!node) {
      return undefined;
    }

    return this.removeNodeLogic(node);
  }

  contains(item) {
    let curr = this.head;

    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.item === item) {
        return true;
      }
      curr = curr.next;
    }

    return false;
  }

  find(item) {
    let curr = this.head;

    for (let i = 0; curr && i < this.length; ++i) {
      if (curr.item === item) {
        return i;
      }
      curr = curr.next;
    }

    return null;
  }

  removeNodeLogic(node) {
    this.length--;

    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this.head) {
      this.head = node.next;
    }

    if (node === this.tail) {
      this.tail = node.prev;
    }

    node.prev = node.next = undefined;
    return node.value;
  }

  getAtLogic(idx) {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    return curr;
  }

  toString() {
    if (this.head === undefined) {
      return "The list is empty";
    }

    let output = "";
    let node = this.head;
    while (node !== undefined) {
      let nodeValue = node.item;
      if (node.prev === null) {
        nodeValue += " (head)";
      } else if (node.next === null) {
        nodeValue += " (tail)";
      }
      output += `[ ${nodeValue} ]` + " <-> ";
      node = node.next;
      if (node === null) {
        break;
      }
    }
    return output + "null";
  }
}

const list = new DoublyLinkedList();
// play with list here
// for methods that do not add a new node, or remove an existing one, you can console.log the method to see the output

// add some items
list.append("I");
list.append("am");
list.append("a");
list.append("doubly");
list.append("linked");
list.append("list.");

// test the methods
list.prepend("Hello.");

// view the list in the console
console.log(list.toString());
