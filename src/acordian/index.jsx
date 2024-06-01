import {useState} from 'react';
import data from './data';
import './styles.css';
// single selection
// multi selection

export default function Acordian(){

    const [select, setSelect] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId){
        setSelect(getCurrentId === select ? null : getCurrentId);
    };

    function handleMultiSelection(getCurrentId){
        let copMultiple = [...multiple];
        const findIndexCurrentID = copMultiple.indexOf(getCurrentId);
        if (findIndexCurrentID === -1) {
            copMultiple.push(getCurrentId)
        }
        else{
            copMultiple.splice(findIndexCurrentID, 1)
        }
        setMultiple(copMultiple);
    };

    return (
        <div className='wrapper'>
            <button onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>Add Multi Selection</button>
            <div className='accordian'>
                {
                data && data.length > 0 ? data.map((dataItem) => (
                    <div className='item'>
                        <div 
                            className='title' 
                            onClick={ enableMultiSelection 
                                ? ()=> handleMultiSelection(dataItem.id) 
                                : ()=> handleSingleSelection(dataItem.id)
                            }
                        >
                            <h3>{dataItem.question}</h3>
                            <span>+</span>
                        </div>
                        {
                            select === dataItem.id 
                            || multiple.indexOf(dataItem.id) !== -1 
                            ? <div className='content'>{dataItem.answer}</div> 
                            : null
                        }
                    </div>
                )) : <div>No data found!</div>
                }
            </div>
        </div>
    );
};