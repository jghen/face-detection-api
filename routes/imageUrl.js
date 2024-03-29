import * as dotenv from "dotenv";
dotenv.config();
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

export const handleApiCall = (req, res) => {
  return app.models
    .predict("aaa03c23b3724a16a56b629203edc62c", req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with api"));
};

//how to do with google rpc

// import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
// const stub = ClarifaiStub.grpc();
// const metadata = new grpc.Metadata();
// metadata.set("authorization", `Key ${process.env.CLARIFAI_API_KEY}`);

// export const handleApiCallGrpc = (req, res) => {
//   stub.PostModelOutputs(
//     {
//       // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
//       model_id: "aaa03c23b3724a16a56b629203edc62c",
//       inputs: [{ data: { image: { url: req.body.input } } }],
//     },
//     metadata,
//     (err, response) => {
//       if (err) {
//         console.log("Error: " + err);
//         return;
//       }

//       if (response.status.code !== 10000) {
//         console.log(
//           "Received failed status: " +
//             response.status.description +
//             "\n" +
//             response.status.details
//         );
//         return;
//       }

//       console.log("Predicted concepts, with confidence values:");
//       for (const c of response.outputs[0].data.concepts) {
//         console.log(c.name + ": " + c.value);
//       }
//       res.json(response);
//     }
//   );
// };
