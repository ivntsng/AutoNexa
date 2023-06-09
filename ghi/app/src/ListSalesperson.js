import { useEffect, useState } from 'react';

function ListSalespeople() {
  const [salespeople, setSalespeople] = useState([]);
  const fetchData = async () => {
    const response = await fetch("http://localhost:8090/api/salespeople/");
  if (response.ok) {
    const data = await response.json();
    setSalespeople(data.salespeople);
  } else {
    console.error(response);
  }}
  useEffect(() => {
    fetchData();
  }, []);

  return (

    <table className="table table-striped">
        <thead>
            <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            </tr>
        </thead>
        <tbody>
            {salespeople.map(salesperson => {
            return(
                <tr key={salesperson.id}>
                    <td>{salesperson.employee_id}</td>
                    <td>{salesperson.first_name}</td>
                    <td>{salesperson.last_name}</td>
            </tr>
            )})}
        </tbody>
    </table>
  )
}

export default ListSalespeople;
