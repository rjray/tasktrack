import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check, Match } from "meteor/check";

import Task from "./task";

const Tasks = new Mongo.Collection("tasks");

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish("tasks", function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
        { assignedTo: this.userId },
      ],
    });
  });
}

Meteor.methods({
  "tasks.create"(task) {
    // Must be a logged-in user to insert a task:
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert(new Task(task));
  },

  "tasks.retrieve"(taskId) {
    check(taskId, Match.OneOf(String, Mongo.ObjectID));

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can retrieve it
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },

  "tasks.update"(taskId, fields) {
    check(taskId, Match.OneOf(String, Mongo.ObjectID));

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can update it
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: fields });
  },

  "tasks.delete"(taskId) {
    check(taskId, Match.OneOf(String, Mongo.ObjectID));

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }

    Tasks.remove(taskId);
  },

  "tasks.setPrivate"(taskId, private) {
    check(taskId, Match.OneOf(String, Mongo.ObjectID));
    check(private, Boolean);

    const task = Tasks.findOne(taskId);
    // Make sure only the task owner can make a task private
    if (task.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private } });
  },
});

export default Tasks;
