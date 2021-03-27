import { useFormik } from "formik";
import React, { useRef, useEffect, ChangeEvent } from "react";

import {
  Form,
  FormBody,
  FormCol,
  FormHeader,
  FormRow,
  FormSubmitWrapper,
  FormTitle,
  FormImage,
  FormImageWrapper,
} from "./styled";
import FormControl from "../FormControl";
import FormControlLabel from "../FormControlLabel";
import FormControlInput from "../FormControlInput";
import FormControlTextarea from "../FormControlTextarea";
import FormControlText from "../FormControlText";
import FormControlDatePicker from "../FormControlDatePicker";
import { PrimaryButton } from "../Button";
import Spinner from "../Spinner";
import { validateItem } from "./helpers";

export interface ItemFormItem {
  title: string;
  description: string;
  price: string;
  image: string;
  discount?: string;
  discountExpireAt?: number;
}

export interface Props extends Partial<ItemFormItem> {
  headerTitle: string;
  onSubmit: (item: ItemFormItem) => Promise<void>;
}

const ItemForm = (props: Props) => {
  const titleField = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!titleField.current) return;

    titleField.current.focus();
  }, []);

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    setFieldValue,
    values,
    isSubmitting,
  } = useFormik<ItemFormItem>({
    initialValues: {
      title: props.title || "",
      description: props.description || "",
      price: props.price || "",
      image: props.image || "",
      discount: props.discount || "",
      discountExpireAt: props.discountExpireAt || 0,
    },
    onSubmit: async (values) => {
      await props.onSubmit({
        title: values.title.toString().trim(),
        description: values.description.toString().trim(),
        price: values.price.toString().trim(),
        image: values.image.toString().trim(),
        discount: values.discount && values.discount.toString().trim(),
        discountExpireAt: values.discountExpireAt,
      });
    },
    validate: validateItem,
  });

  const onDiscountExpireAtChange = (date: Date) => {
    if (!date) return;
    setFieldValue("discountExpireAt", date.getTime());
  };

  const onImageInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      !event.currentTarget ||
      !event.currentTarget.files ||
      !event.currentTarget.files[0]
    )
      return;

    const url = window.URL.createObjectURL(event.currentTarget.files[0]);
    setFieldValue("image", url);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader>
        <FormTitle>{props.headerTitle}</FormTitle>
      </FormHeader>
      <FormBody>
        <FormRow>
          <FormCol>
            <FormControl>
              <FormControlLabel>Image*</FormControlLabel>
              <input type="file" id="image" onChange={onImageInputChange} />
              {touched.image && errors.image && (
                <FormControlText>{errors.image}</FormControlText>
              )}
            </FormControl>
          </FormCol>
          <FormCol>
            {/* TODO add image loading logic */}
            {values.image && (
              <FormControl>
                <FormImageWrapper>
                  <FormImage src={values.image} alt="item-img" />
                </FormImageWrapper>
              </FormControl>
            )}
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol>
            <FormControl>
              <FormControlLabel htmlFor="title">Title*</FormControlLabel>
              <FormControlInput
                id="title"
                type="text"
                placeholder="Enter title"
                {...getFieldProps("title")}
                ref={titleField as any}
              />
              {touched.title && errors.title && (
                <FormControlText>{errors.title}</FormControlText>
              )}
            </FormControl>
          </FormCol>
          <FormCol>
            <FormControl>
              <FormControlLabel htmlFor="price">Price*</FormControlLabel>
              <FormControlInput
                id="price"
                placeholder="Enter price"
                {...getFieldProps("price")}
              />
              {touched.price && errors.price && (
                <FormControlText>{errors.price}</FormControlText>
              )}
            </FormControl>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol>
            <FormControl>
              <FormControlLabel htmlFor="description">
                Description
              </FormControlLabel>
              <FormControlTextarea
                id="description"
                placeholder="Enter description"
                {...getFieldProps("description")}
              />
              {touched.description && errors.description && (
                <FormControlText>{errors.description}</FormControlText>
              )}
            </FormControl>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol>
            <FormControl>
              <FormControlLabel htmlFor="discount">Discount</FormControlLabel>
              <FormControlInput
                id="discount"
                placeholder="Enter discount"
                {...getFieldProps("discount")}
                disabled={!values.price}
              />
              {touched.discount && errors.discount && (
                <FormControlText>{errors.discount}</FormControlText>
              )}
            </FormControl>
          </FormCol>
          <FormCol>
            <FormControl>
              <FormControlLabel htmlFor="discountExpireAt">
                End of discount
              </FormControlLabel>
              <FormControlDatePicker
                id="discountExpireAt"
                {...getFieldProps("discountExpireAt")}
                selected={new Date(values.discountExpireAt || 0)}
                onChange={onDiscountExpireAtChange}
                disabled={!values.price || !values.discount}
              />
              {touched.discountExpireAt && errors.discountExpireAt && (
                <FormControlText>{errors.discountExpireAt}</FormControlText>
              )}
            </FormControl>
          </FormCol>
        </FormRow>
        <FormSubmitWrapper>
          <PrimaryButton
            type="submit"
            startIcon={isSubmitting && <Spinner size="16px" />}
            disabled={isSubmitting}
          >
            Submit
          </PrimaryButton>
        </FormSubmitWrapper>
      </FormBody>
    </Form>
  );
};

export default ItemForm;
