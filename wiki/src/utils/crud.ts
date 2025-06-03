import PocketBase from "pocketbase";

const pb = new PocketBase("http://192.168.1.3:8089");

export function Create() {}

export function Delete(id: string) {
  try {
    pb.collection("Wiki").delete(id);
  } catch (error) {
    console.log(error);
  }
}

export function Update() {}

export function Read() {}
