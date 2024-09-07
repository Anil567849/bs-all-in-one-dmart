import React from "react";
import {Card as C, CardHeader, CardBody, Divider, Link, Image} from "@nextui-org/react";
import { IinsData } from "../page";

export default function InsCard({insData}: {insData: IinsData}) {
  return (
    <C className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          width={40}
          src="https://avatars.githubusercontent.com/u/26001409?s=200&v=4"
          className="opacity-100"
        />
        <div className="flex flex-col">
          <p className="text-start text-xl font-bold p-1">{insData.instrumentToken}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Open: {insData.open}</p>
        <p>High: {insData.high}</p>
        <p>Low: {insData.low}</p>
        <p>Close: {insData.close}</p>
      </CardBody>
      <Divider/>
    </C>
  );
}
