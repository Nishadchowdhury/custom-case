"use server";

import { db } from "@/app/db";
import {
  CaseColor,
  CaseFinished,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";

interface saveConfigProps {
  color: string;
  finish: string;
  material: string;
  model: string;
  configId: string;
} // yes we can use this interface as traditional way but we made some enum's that are also as interfaces so we'll use that instead.

// it's an RPC remote procedure call. It is like a function that do something on the server without hitting to any URL.
// This time we shouldn't pass data through a POST body call

export interface SaveConfigArgs {
  color: CaseColor;
  finish: CaseFinished;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
}

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: {
      color,
      finish,
      material,
      model,
    },
  });
}

// 6:20:00
