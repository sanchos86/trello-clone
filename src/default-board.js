import {v4 as uuidv4} from 'uuid';

export class Task {
  constructor(name, description) {
    this.id = uuidv4();
    this.name = name;
    this.description = description || '';
  }
}

export class Column {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.tasks =  [];
  }
}

export default {
  name: 'default board name',
  columns: [
    new Column('to do'),
    new Column('in progress'),
    new Column('done'),
  ]
};