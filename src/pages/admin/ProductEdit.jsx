import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import instance from "../../axios";

const productSchema = z.object({
  title: z.string().min(6, { message: "Ten san pham phai co it nhat 6 ky tu" }),
  price: z.number().min(0, { message: "Phai lon hon 0" }),
  description: z.string().optional(),
});

const ProductEdit = ({ onEdit }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products/${id}`);
      reset(data);
    })();
  }, []);
  const onSubmit = (data) => {
    onEdit({ ...data, id });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Edit product</h1>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title?.message && (
            <p className="text-danger">{errors.title?.message}</p>
          )}
        </div>

        <div className="form-group mb-3">
          <label className="form-label" htmlFor="price">
            Price
          </label>
          <input
            className="form-control"
            type="number"
            id="price"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price?.message && (
            <p className="text-danger">{errors.price?.message}</p>
          )}
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            className="form-control"
            type="text"
            id="description"
            {...register("description")}
          />
        </div>
        <div className="form-group mb-3">
          <button className="btn btn-primary w-100" type="submit">
            Edit product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
