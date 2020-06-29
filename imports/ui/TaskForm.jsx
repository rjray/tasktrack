import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
  Formik,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

import "react-datepicker/dist/react-datepicker.css";

import { taskPriorityList, taskStatusList } from "../api/tasks";

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(
      255,
      <em style={{ fontSize: "75%", color: "red" }}>
        Name cannot exceed 255 characters
      </em>
    )
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>Name cannot be empty</em>
    ),
  description: Yup.string()
    .max(
      1000,
      <em style={{ fontSize: "75%", color: "red" }}>
        Description cannot exceed 1000 characters
      </em>
    )
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        Description cannot be empty
      </em>
    ),
  dueAt: Yup.date().required(
    <em style={{ fontSize: "75%", color: "red" }}>Due date must be given</em>
  ),
  notes: Yup.string().max(
    10000,
    <em style={{ fontSize: "75%", color: "red" }}>
      Notes cannot exceed 10000 characters
    </em>
  ),
});

const TaskForm = ({ type = "new", task, submitHandler, currentUser }) => {
  const isUpdate = type === "update";

  const initialValues = { ...task, owner: currentUser._id };
  if (!initialValues.dueAt) {
    initialValues.dueAt = addDays(new Date(), 1);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
      }) => (
        <Form className="mt-3">
          <Form.Group as={Form.Row} controlId="name" className="mb-2">
            <Form.Label column sm={3} className="text-md-right text-sm-left">
              Name:
              <ErrorMessage name="name" component="p" />
            </Form.Label>
            <Col sm={9}>
              <Field
                as={Form.Control}
                type="text"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Name"
                data-lpignore="true"
                autoFocus
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row} controlId="priority">
            <Form.Label column sm={3} className="text-md-right text-sm-left">
              Priority:
            </Form.Label>
            <Col sm={3}>
              <Field
                as={Form.Control}
                type="select"
                component="select"
                name="priority"
                onBlur={handleBlur}
                onChange={handleChange}
                style={{ width: "100%", marginTop: "0.35rem" }}
              >
                {taskPriorityList.map((type, index) => (
                  <option key={index} value={index}>
                    {type}
                  </option>
                ))}
              </Field>
            </Col>
          </Form.Group>
          {isUpdate && (
            <Form.Group as={Form.Row} controlId="status">
              <Form.Label column sm={3} className="text-md-right text-sm-left">
                Status:
              </Form.Label>
              <Col sm={3}>
                <Field
                  as={Form.Control}
                  type="select"
                  component="select"
                  name="status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  style={{ width: "100%", marginTop: "0.35rem" }}
                >
                  {taskStatusList.map((type, index) => (
                    <option key={index} value={index}>
                      {type}
                    </option>
                  ))}
                </Field>
              </Col>
            </Form.Group>
          )}
          {isUpdate && (
            <>
              <Form.Group as={Form.Row} controlId="createdAt">
                <Form.Label
                  column
                  sm={3}
                  className="text-md-right text-sm-left"
                >
                  Created:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={format(
                      values.createdAt,
                      "MMMM d, yyyy h:mm aa"
                    )}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Form.Row} controlId="updatedAt">
                <Form.Label
                  column
                  sm={3}
                  className="text-md-right text-sm-left"
                >
                  Updated:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={format(
                      values.updatedAt,
                      "MMMM d, yyyy h:mm aa"
                    )}
                  />
                </Col>
              </Form.Group>
            </>
          )}
          <Form.Group as={Form.Row} controlId="dueAt">
            <Form.Label column sm={3} className="text-md-right text-sm-left">
              Due:
            </Form.Label>
            <Col sm={9}>
              <DatePickerField
                name="dueAt"
                onBlur={handleBlur}
                minDate={new Date()}
                showDisabledMonthNavigation
                showTimeInput
                timeInputLabel="Time:"
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Date Due"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Form.Row} controlId="description" className="mb-2">
            <Form.Label column sm={3} className="text-md-right text-sm-left">
              Description:
              <ErrorMessage name="description" component="p" />
            </Form.Label>
            <Col sm={9}>
              <Field
                as={Form.Control}
                component="textarea"
                className="form-control"
                onBlur={handleBlur}
                onChange={handleChange}
                rows={4}
                name="description"
                placeholder="Description"
              />
            </Col>
          </Form.Group>
          {isUpdate && (
            <Form.Group as={Form.Row} controlId="notes" className="mb-2">
              <Form.Label column sm={3} className="text-md-right text-sm-left">
                Notes:
                <ErrorMessage name="notes" component="p" />
              </Form.Label>
              <Col sm={9}>
                <Field
                  as={Form.Control}
                  component="textarea"
                  className="form-control"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  rows={4}
                  name="notes"
                  placeholder="Notes"
                />
              </Col>
            </Form.Group>
          )}
          <Form.Group as={Form.Row} className="mt-3">
            <Col sm={{ span: 9, offset: 3 }}>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isUpdate ? "Update" : "Submit"}
              </Button>{" "}
              <Button type="reset" onClick={handleReset}>
                Reset
              </Button>
            </Col>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
