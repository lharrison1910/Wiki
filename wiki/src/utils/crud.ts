import PocketBase from "pocketbase";
import type { FileProps } from "../types/FileType";

const pb = new PocketBase("http://192.168.1.3:8089");

export function Create(data: FileProps) {
  try {
    pb.collection("Wiki").create(data);
  } catch (error) {
    console.log(error);
  }
}

export function Delete(id: string) {
  try {
    pb.collection("Wiki").delete(id);
  } catch (error) {
    console.log(error);
  }
}

export function Update(data: FileProps) {
  try {
    pb.collection("Wiki").update(data.id, data);
  } catch (error) {
    console.log(error);
  }
}

export function Read() {}
