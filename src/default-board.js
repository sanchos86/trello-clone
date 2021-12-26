import { v4 as uuidv4 } from 'uuid';

class Task {
  constructor(name, description, userAssigned = null) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.userAssigned = userAssigned;
  }
}

export default {
  name: 'default board name',
  columns: [
    {
      name: ' to do',
      tasks: [
        new Task('hello'),
        new Task('hello two', 'bebra')
      ]
    },
    {
      name: 'in progress'
    },
    {
      name: 'done'
    }
  ]
};