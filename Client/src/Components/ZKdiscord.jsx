import React from 'react'
import { readFile } from 'fs';

const ZKdiscord = (props) => {
  return (
    <div> Hi {props.provingKey}</div>
  )
}

export async function getStaticProps() {
    // zokrates artifacts
    const source = (await readFile("./ZKP/server_check.zok")).toString();
    const program = (await readFile("./ZKP/out")).toString("hex");
    const verificationKey = JSON.parse(
      (await readFile("./ZKP/verification.key")).toString()
    );
    const provingKey = (await readFile("./ZKP/proving.key")).toString("hex");
  
    return {
      props: {
        source,
        program,
        verificationKey,
        provingKey,
      },
    };
  }
  
export default ZKdiscord