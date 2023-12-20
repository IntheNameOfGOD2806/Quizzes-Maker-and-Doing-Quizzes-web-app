import React from 'react';
import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/apiservice';
import './listQuiz.scss'
const ListQuiz = (props) => {
    const[listQuiz, setlistQuiz] = useState([]);
    const fetchQuizData = async () => {
        const result = await getQuizByUser();
        if (result && result.EC===0) {
            // console.log(result)
            setlistQuiz(result.DT);
            // console.log(listQuiz)
        }
    }
    useEffect(() => {
        fetchQuizData();
    }, [])
    return (
    
       <>
       <div className='listQuiz-container container-fluid d-flex flex-row gap-5 p-5'>
           {listQuiz && listQuiz.map((item, index) => {
           return (
               <div key={`${index}-Quiz`} className="card" style={{ width: '18rem',borderRadius:'5px' }}>
                   <img src={`data:image/png;base64,${item.image}`} className="card-img-top" alt="..." />
                   <div className="card-body">
                       <h5 className="card-title">Quiz {index+1}</h5>
                       <p className="card-text">{item.description}</p>
                       <a href="#" className="btn btn-primary">Doing Quizz!!</a>
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