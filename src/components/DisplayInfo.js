import React, { useEffect, useState } from "react";
import "./Displayinfo.scss"
import logo from "../logo.svg";
// class DisplayInfo extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log("constructor1");
//         this.state = {
//             isShowListUsers: false,
//         }
//     }
//     componentDidMount() {
       
//         console.log("componentDidMount");
//     }
//     componentDidUpdate(prevProps, prevState) {
       
//         console.log("prevProps", prevProps);
        
//     }
  
//     render() {
        
//         console.log("render");
//         // console.table(props);
//         const { listUsers } = props;
//         var check = false;
//         if (check) {
//             var arr = listUsers.filter((user) => user.age > 12);
//             console.table(arr);
//             return (
//                 <div>
//                     <ul>
//                         {arr.map(user => (
//                             <li key={user.id}>
//                                 {user.name}-{user.age}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             );
//         }
//         const handleShowListUsers = (event) => {
//             // if(this.state.isShowListUsers===true){
//             //     this.setState({
//             //         isShowListUsers:false
//             //     });
//             // }else{
//             //     this.setState({
//             //         isShowListUsers:true
//             //     });
//             // }
//             this.setState({
//                 isShowListUsers: !this.state.isShowListUsers
//             });
//         }
//         return (
//             <div className="display-info-container">
//                 <div>
//                     <div>
//                         <span onClick={(event) => (handleShowListUsers(event))}>
//                             {this.state.isShowListUsers ? "Hide List Users" : "Show List Users"}
//                         </span>
//                     </div>
//                     {this.state.isShowListUsers &&
//                         <ul>
//                             {listUsers.map((user) => {
//                                 return (
//                                     <li className={+user.age > 12 ? "red" : ""} key={user.id}>
//                                         {user.name}-{user.age}
//                                         <div>
//                                             <button onClick={(event) => (props.handleDeleteUser(event, user.id))}>
//                                                 X
//                                             </button>
//                                         </div>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     }
//                 </div>
//                 <img src={logo} alt="dđ" />
//             </div>
//         );
//     }
// }
const DisplayInfo=(props)=>{
    console.log(props)
    const { listUsers } = props;
    const [isShowListUsers,setShowListUsers]=useState(true);
    
       
        
        console.log("render");
        // console.table(props);
        
     
        const handleShowListUsers = (event) => {
         
            // this.setState({
            //     isShowListUsers: !this.state.isShowListUsers
            // });
            setShowListUsers(!isShowListUsers)
        }
   
        
        return (
            <div className="display-info-container">
                <div>
                  <div>
                    <span onClick={(event) => (handleShowListUsers(event))} >{isShowListUsers ? "Hide List Users" : "Show List Users"}</span>
                  </div>
                    {isShowListUsers &&
                        <ul>
                            {listUsers.map((user) => {
                                return (
                                    <li className={+user.age > 12 ? "red" : ""} key={user.id}>
                                        {user.name}-{user.age}
                                        <div>
                                            <button onClick={(event) => (props.handleDeleteUser(event, user.id))}>
                                                X
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    }
                </div>
                <img className="logo" src={logo} alt="dđ" />
            </div>
        );
    }


export default DisplayInfo;