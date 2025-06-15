import { tasksTable } from "@/db/schema.js";
import dayjs from "dayjs";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod/v4";

// ---任务获取---
/** 任务获取-zod */
export const taskGetSchema = createSelectSchema(tasksTable, {
  createdAt: (schema) =>
    schema.transform((_) => dayjs(_).format("YYYY-MM-DD HH:mm:ss")),
  updatedAt: (schema) =>
    schema.transform((_) => dayjs(_).format("YYYY-MM-DD HH:mm:ss")),
});

/** 任务获取-type */
export type TaskGetSchema = z.infer<typeof taskGetSchema>;

// ---任务新增---
/** 任务新增-zod */
export const taskAddSchema = createInsertSchema(tasksTable, {
  title: (schema) => schema.max(20),
}).pick({
  title: true,
  completed: true,
});

/** 任务新增-type */
export type TaskAddSchema = z.infer<typeof taskAddSchema>;

// ---任务修改---
/** 任务修改-zod */
export const taskUpdateSchema = taskAddSchema.partial();
export type TaskUpdateSchema = z.infer<typeof taskUpdateSchema>;
