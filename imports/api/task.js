/*
 * The Task class and related stuff.
 */

import { Mongo } from 'meteor/mongo';

const taskFields = new Set([
  "name",
  "description",
  "priority",
  "status",
  "owner",
  "private",
  "assignedTo",
  "notes",
  "createdAt",
  "dueAt",
  "updatedAt",
  "completedAt",
  "parent",
]);

const taskStatus = {
  TODO: "To Do",
  INPROGRESS: "In Progress",
  COMPLETE: "Complete",
};

class Task {
  constructor(task) {
    // Allow the constructor to act as a sort of clone op:
    delete task._id;

    if (!Task.validate(task)) {

    }

    for (const key in task) {
      this[key] = task[key];
    }

    this.createdAt = new Date();
    this.status = taskStatus.TODO;
    if (!this.hasOwnProperty("priority")) {
      this.priority = 3;
    }

    return;
  }

  static validate(task) {
    const seen = new Set();

    for (const key in task) {
      if (!taskFields.has(key)) {
        throw new Error(`Unknown task key: ${key}`);
      }
      seen.add(key);
    }

    ["name", "description", "owner"].forEach((key) => {
      if (!seen.has(key)) {
        throw new Error(`Missing required task key: ${key}`);
      }
    });

    return true;
  }
}

export default Task;
