import React from 'react';
import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/apiservice';
const ListQuiz = (props) => {
    const[listQuiz, setlistQuiz] = useState([]);
    const fetchQuizData = async () => {
        const result = await getQuizByUser();
        if (result && result.EC===0) {
            // console.log(result)
            setlistQuiz(result.DT);
            console.log(listQuiz)
        }
    }
    useEffect(() => {
        fetchQuizData();
    }, [])
    return (
    
       <>
       <div className='listQuiz-container container-fluid d-flex flex-row gap-5'>
           {listQuiz && listQuiz.map((item, index) => {
           return (
               <div key={`${index}-Quiz`} className="card" style={{ width: '18rem' }}>
                   <img src={`data:image/png;base64,${item.image}`} className="card-img-top" alt="..." />
                   <div className="card-body">
                       <h5 className="card-title">Card title</h5>
                       <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                       <a href="#" className="btn btn-primary">Go somewhere</a>
                   </div>
               </div>
           )
       })

       }
       </div>
    
       </>
    );
}

export default ListQuiz;