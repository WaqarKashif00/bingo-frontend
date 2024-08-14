// import axios from "axios";
// import { useEffect, memo, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const BingoNumbers = ({
//   bingoRandomNumbers,
//   ticketPrice,
//   id,
//   pushNumToBingoArray,
// }) => {
//   let navigate = useNavigate();
//   const [BN, setBN] = useState(JSON.parse(JSON.stringify(bingoRandomNumbers)));

//   const removeFirstElement = async () => {
//     if (BN.length) {
//       pushNumToBingoArray(BN[0]);
//       // updateBingoNums(BN[0]);
//       setBN(BN.slice(1));
//     } else {
//       navigate("/winner", {
//         replace: true,
//         state: { winner: "None", id: id, reward: ticketPrice },
//       });
//     }
//   };

//   const updateBingoNums = async (num) => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_HOST}/rooms/update/${id}?_num=${num}`,
//         {
//           headers: {
//             "x-access-bingo-token":
//               JSON.parse(sessionStorage.getItem("x-bingo-token")) ?? null,
//           },
//         }
//       );
//     } catch (err) {
//       // console.error(err);
//     }
//   };

//   useEffect(() => {
//     const _id = setInterval(() => {
//       removeFirstElement();
//     }, process.env.REACT_APP_BINGO_NUMBER_DURATION_FETCH ?? 5000);

//     return () => {
//       clearInterval(_id);
//     };
//   });

//   useEffect(() => {
//     if (BN && BN.length) {
//       new Audio(`./assets/audio/${BN[0]}.mp3`).play();
//     }
//   }, [BN]);

//   return (
//     <>
//       <div className="d-flex align-items-center justify-content-evenly">
//         <div className="rounded-circle bg-white p-1 text-center round-orange-border">
//           {BN && BN.length && BN[1]}
//         </div>
//         <div className="rounded-circle bg-white p-1 text-center round-orange-border">
//           {BN && BN.length && BN[2]}
//         </div>
//       </div>
//       <div className="d-flex align-items-center justify-content-around">
//         <div className="rounded-circle bg-white p-1 text-center round-orange-border">
//           {BN && BN.length && BN[4]}
//         </div>
//         <div className="rounded-circle bg-white p-3 text-center round-yellow-border">
//           {BN && BN.length && BN[0]}
//         </div>
//         <div className="rounded-circle bg-white p-1 text-center round-orange-border">
//           {BN && BN.length && BN[3]}
//         </div>
//       </div>
//     </>
//   );
// };

// export default memo(BingoNumbers);
