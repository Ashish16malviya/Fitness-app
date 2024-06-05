// import React, { useEffect, useState } from 'react';
// import { Box, Button, Stack, TextField, Typography } from "@mui/material";

// import { exerciseOptions, fetchData } from "../utils/fetchData";
// import HoriozntalScrollbar from "./HorizontalScrollbar";

// const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
//   const [search, setSearch] = useState('');
//   const [bodyParts, setBodyParts] = useState([]);

//   useEffect(() => {
//     const fetchExercisesData = async () => {
//       const bodyPartsData = await fetchData("https://exercisedb.p..rapidapi.com/exercises/bodyPartList",exerciseOptions);

//       setBodyParts(["all", ...bodyPartsData]);
//     };
//     fetchExercisesData();
//   }, []);

//   const handleSearch = async () => {
//     if (search) {
//       const exerciseData = await fetchData(
//         "https://exercisedb.p..rapidapi.com/exercises",
//         exerciseOptions
//       );
//       const SearchExercises = exerciseData.fillter(
//         (exercise) =>
//           exercise.name.toLowerCase().includes(search) ||
//           exercise.target.toLowerCase().includes(search) ||
//           exercise.equipment.toLowerCase().includes(search) ||
//           exercise.bodyPart.toLowerCase().includes(search),
//       );
//       setSearch("");
//       setExercises(SearchExercises);
//     }
//   };
//   return (
//     <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
//       <Typography
//         fontWeight={700}
//         sx={{ fontSize: { lg: "44px", xs: "30px" } }}
//         mb="49px"
//         textAlign="center"
//       >
//         Awesome Exercise You <br />
//         should know
//       </Typography>
//       <Box position="relative" mb='72px'>
//         <TextField
//           sx={{
//             input: { fontWeight: "700", boarder: "none", borderRadius: "4px" },
//             width: { lg: "1170px", xs: "350px" },
//             backgroundColor: "#fff",
//             borderRadius: "40px",
//           }}
//           height="76px"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value.toLowerCase());
//           }}
//           placeholder="Search Exercises"
//           type="text"
//         />

//         <Button
//           className="search-btn"
//           sx={{
//             bgcolor: "#ff2625",
//             color: "#fff",
//             textTransform: "none",
//             width: { lg: "175px", xs: "80px" },
//             fontSize: { lg: "20px", xs: "14px" },
//             height: "56px",
//             position: "absolute",
//             right: "0",
//           }}
//           onClick={handleSearch}
//         >
//           Search
//         </Button>
//       </Box>

//       <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
//         <HoriozntalScrollbar
//           data={bodyParts}
//           bodyPart={bodyPart}
//           setBodyPart={setBodyPart}
//           isBodyParts
//         />
//       </Box>
//     </Stack>
//   );
// };
// export default SearchExercises;


import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {

        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPart', {
          ...exerciseOptions,
          timeout: 10000,
        }).catch(error => {
         if (error.name === 'AbortError') {
            console.error('Request timed out');
          } else {
            console.error('Error fetching body parts data:', error);
          }
        });

        const data = await response.json();
console.log(data);
        if (Array.isArray(data)) {
          setBodyParts(['all', ...data]);
        }
      } catch (error) {
        console.error('Error fetching body parts data:', error);
      }
    };
    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      try {
        const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

        const searchedExercises = exercisesData.filter(
          (item) => item.name.toLowerCase().includes(search)
            || item.target.toLowerCase().includes(search)
            || item.equipment.toLowerCase().includes(search)
            || item.bodyPart.toLowerCase().includes(search),
        );

        setSearch('');
        setExercises(searchedExercises);
      } catch (error) {
        console.error('Error searching exercises:', error);
      }
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          height="76px"
          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      </Box>
    </Stack>
  );
};
export default SearchExercises;

// -import React, { useEffect, useState } from 'react';
// -import { Box, Button, Stack, TextField, Typography } from '@mui/material';
// -
// -import { exerciseOptions, fetchData } from '../utils/fetchData';
// -import HorizontalScrollbar from './HorizontalScrollbar';
// -
// -const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
// -  const [search, setSearch] = useState('');
// -  const [bodyParts, setBodyParts] = useState([]);
// -
// -  useEffect(() => {
// -    const fetchExercisesData = async () => {
// -      try {
// -        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
// -        const data = await response.json();
// -    
// -        if (!Array.isArray(data)) {
// -          throw new Error('API response is not an array');
// -        }
// -    
// -        setBodyParts(['all', ...data]);
// -      } catch (error) {
// -        console.error('Error fetching body parts data:', error);
// -        // Handle the error appropriately (e.g., display an error message to the user)
// -      }
// -    };
// -    fetchExercisesData();
// -  }, []);
// -
// -  const handleSearch = async () => {
// -    if (search) {
// -      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
// -
// -      const searchedExercises = exercisesData.filter(
// -        (item) => item.name.toLowerCase().includes(search)
// -               || item.target.toLowerCase().includes(search)
// -               || item.equipment.toLowerCase().includes(search)
// -               || item.bodyPart.toLowerCase().includes(search),
// -      );
// -
// -      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
// -
// -      setSearch('');
// -      setExercises(searchedExercises);
// -    }
// -  };
// -
// -  return (
// -    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
// -      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="49px" textAlign="center">
// -        Awesome Exercises You <br /> Should Know
// -      </Typography>
// -      <Box position="relative" mb="72px">
// -        <TextField
// -          height="76px"
// -          sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '1170px', xs: '350px' }, backgroundColor: '#fff', borderRadius: '40px' }}
// -          value={search}
// -          onChange={(e) => setSearch(e.target.value.toLowerCase())}
// -          placeholder="Search Exercises"
// -          type="text"
// -        />
// -        <Button className="search-btn" sx={{ bgcolor: '#FF2625', color: '#fff', textTransform: 'none', width: { lg: '173px', xs: '80px' }, height: '56px', position: 'absolute', right: '0px', fontSize: { lg: '20px', xs: '14px' } }} onClick={handleSearch}>
// -          Search
// -        </Button>
// -      </Box>
// -      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
// -        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
// -      </Box>
// -    </Stack>
// -  );
// -};
// -
//  export default SearchExercises;
// <<<<<<<  0decedd6-c782-4384-a3b9-7bdc1ff350ad  >>>>>>>