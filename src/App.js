import { useState } from 'react'
import playersData from './data/playerdata'

const App = () => {
  const [sort, setSort] = useState();
  const [name, setName] = useState('');
  const [minAverage, setMinAverage] = useState();
  const [maxAverage, setMaxAverage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 5; //Number of Player on Per Page
  // Pagination for Page Change
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Players Sort In Ascending and Descending
  const sortedPlayers = playersData.slice().sort((a, b) => {
    if (sort === 'ascending') {
      return a.battingAverage - b.battingAverage;
    } else if (sort === 'descending') {
      return b.battingAverage - a.battingAverage;
    }
    return 0;
  });

  // Players Filter By Name, Minimum Average and Maximum Average
  const filteredPlayers = sortedPlayers.filter(playerData =>
    playerData.name.toLowerCase().includes(name.toLowerCase()) && (!minAverage || playerData.battingAverage >= parseFloat(minAverage)) && (!maxAverage || playerData.battingAverage <= parseFloat(maxAverage))
  );

  // Pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayer = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);


  return (
    <div className='p-5'>
      <h2 className='w-full text-center text-4xl font-bold'>Cricket Player Management System</h2>

      <div className='w-full flex flex-wrap items-center justify-evenly mt-5'>
        <div className='flex flex-col relative'>
          <label className='text-gray-800 font-medium'>Name</label>
          <input className='border-b-2 border-black outline-none px-2' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='flex flex-col relative'>
          <label className='text-gray-800 font-medium'>Min-Average</label>
          <input className='border-b-2 border-black outline-none px-2' type="number" value={minAverage} onChange={(e) => setMinAverage(e.target.value)} />
        </div>
        <div className='flex flex-col relative'>
          <label className='text-gray-800 font-medium'>Max-Average</label>
          <input className='border-b-2 border-black outline-none px-2' type="number" value={maxAverage} onChange={(e) => setMaxAverage(e.target.value)} />
        </div>
      </div>
      <table className="w-full mt-5">
        <thead>
          <tr className="bg-gray-300">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Country</th>
            <th className="py-2 px-4">Batting-Averages
              <button className="bg-black text-white rounded-full p-2 text-sm ml-2" onClick={() => setSort('ascending')}>Asc</button>
              <button className="bg-black text-white rounded-full p-2 text-sm ml-2" onClick={() => setSort('descending')}>Des</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPlayer.map(playerData => (
            <tr key={playerData.id} className="border-t text-center">
              <td className="py-2 px-4">{playerData.name}</td>
              <td className="py-2 px-4">{playerData.country}</td>
              <td className="py-2 px-4">{playerData.battingAverage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5">
        <ul className="flex items-center justify-center gap-2">
          {Array(Math.ceil(filteredPlayers.length / playersPerPage))
            .fill()
            .map((_, i) => (
              <li key={i} className="mr-2">
                <button onClick={() => paginate(i + 1)} className="rounded-full px-2 py-1 text-sm bg-gray-500 border-2 text-white hover:text-gray-500 hover:bg-transparent">{i + 1}</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App
