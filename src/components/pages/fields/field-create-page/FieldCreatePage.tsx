// @ts-ignore
import React, { Fragment } from "react";
import { Formik, Field, Form } from "formik";
import { toast } from "react-toastify";
// @ts-ignore
import { size as _size } from "lodash";

import "./FieldCreatePage.css";
import { getShemaForFieldls } from "../../../../helpers/shemas";
import { InputText, Checkbox } from "../../../elements";
import { TypeSelect } from "../../../../containers/elements";
import { bl } from "../../../../helpers/libs/bl";
import { partsOfWords } from "../../../../helpers/constants";

interface IProps {
  t: any;
  addField: (v: any) => void;
}

const FieldCreatePage = ({ t, addField }: IProps): JSX.Element => {
  const id = -Date.now();

  const fieldInputs = (
    <Formik
      initialValues={{
        title: "",
        name: "",
        type: null,
        isMultiple: false,
        isRequired: false,
        placeholder: "",
        configuration: null,
        id,
        className: "model",
      }}
      validationSchema={getShemaForFieldls(
        t("validation.maxLen"),
        t("validation.minLen"),
        t("validation.requiredText")
      )}
      onSubmit={(values, { setSubmitting }) => {
        addField(values);

        bl.addInObjectForSync({
          action: partsOfWords.ADD,
          part: partsOfWords.FIELDS,
          values: { ...values, _links: { self: { href: "URL/api/fields" } } },
        });

        toast(
          t("toast.text", { type: t("toast.field"), action: t("toast.create") })
        );

        setTimeout(() => {
          setSubmitting(false);
        }, 300);
      }}
      render={({ setFieldValue, isSubmitting, errors, touched }) => (
        <Form className="form-container  model-inputs-fields">
          <Field
            component={InputText}
            name="title"
            id="title"
            label={t("fields.edit.title")}
          />
          <Field
            component={InputText}
            name="name"
            id="name"
            label={t("fields.edit.name")}
          />
          <Field
            component={InputText}
            name="placeholder"
            id="placeholder"
            label={t("fields.edit.placeholder")}
          />
          <Field
            component={Checkbox}
            name="isMultiple"
            id="isMultiple"
            label={t("fields.edit.isMultiple")}
          />
          <Field
            component={Checkbox}
            name="isRequired"
            id="isRequired"
            label={t("fields.edit.isRequired")}
          />
          <TypeSelect
            onChange={setFieldValue}
            label={t("fields.edit.type")}
            error={errors.type}
          />
          <button
            type="submit"
            className="btn btn-success pt-20"
            disabled={isSubmitting || !_size(touched)}
          >
            {isSubmitting ? t("buttons.wait") : t("buttons.save")}
          </button>
        </Form>
      )}
    />
  );

  return (
    <Fragment>
      <h1 className="display-4">{t("fields.create.pageTitle")}</h1>
      {fieldInputs}
    </Fragment>
  );
};

export { FieldCreatePage };
