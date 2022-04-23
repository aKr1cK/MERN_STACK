// import React from 'react';

// import logo from '../../src/errorPageIcon.svg';

// function Errorpage(){
//     return (
//         <div>
//             <div>
//                 <img src={logo} alt="" width="100%" height="100%"/>
//             </div>
//             <div>
//                 <h2>We are sorry !! Page Not found</h2>
//             </div>
//         </div>
//     );
// }

//export default Errorpage;

import React, { Component } from 'react'

export default class Errorpage extends Component {
    render() {
        return (
            <div>
                <div>
                    <img src={logo} alt="" width="100%" height="100%" />
                </div>
                <div>
                    <h2>We are sorry !! Page Not found</h2>
                </div>
            </div>
        )
    }
}
