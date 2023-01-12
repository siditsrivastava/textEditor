import React, { useState , useEffect} from 'react'



const getLocalItems = () => {
    let lists = localStorage.getItem('lists')

    if(lists) {
        return JSON.parse(localStorage.getItem('lists'));
    }else{
        return [];
    }
}


export default function TextForm(props) {

    
    
    const [items, setItems] = useState(getLocalItems());
    const [text, setText] = useState('');
    const [isEdit , setIsEdit] = useState(null);
    const [toogleSubmit, settoggleSubmit] = useState(true);

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    const handleSave = () => {

        // if(text && !toogleSubmit ){
                // setItems(
                //     items.map((items) => {
                //         if(items.id === isEdit){
                //             return{ ...items , name:text};
                //         }
                //     })
                // )
        // }else{
            if(!text){

            }else if(text && !toogleSubmit ){
                setItems(
                    // eslint-disable-next-line array-callback-return
                    items.map((items) => {
                        if(items.id === isEdit){
                            return{ ...items , name:text};
                        }
                        return items;
                    })
                    
                )
                 settoggleSubmit(true)
                 setText('');
                 setIsEdit(null);
                 props.showAlert("Sucessfully Edit!", "success");
            }
            else{
                const alltext = {id: new Date().getTime().toString(), name:text}
                setItems([...items, alltext]);
                props.showAlert("Saved!", "success");
                setText(" ");
            }
           
        // }

        
    }

    const handlePrint = () => {

    }
   
    const deleteItems = (index) => {
       const updatedItems = items.filter((items) => {
            return index !== items.id;
       });
       setItems(updatedItems);
    }

    const EditItems = (id) => {
        let newEditItems = items.find((items) => {
            return items.id === id;
        });

        settoggleSubmit(false)
        setText(newEditItems.name);
        setIsEdit(id);
        

    }
    
    // add data in a local storage

        useEffect(() => {
          localStorage.setItem("lists" ,JSON.stringify(items) )

        }, [items])

        
       
        
    
    
    // text = "new text"; // Wrong way to change the state
    // setText("new text"); // Correct way to change the state
    
    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} id="myBox" rows="8"></textarea>
                </div>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleSave}>Save</button>
                {/* <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUndo}>Undo</button> */}
                
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</p>

                <div className="card"  onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}>
                    <div className ="card-body" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                    <h5 className ="card-title">Preview</h5>
                    <p className ="card-text" onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}>{text.length > 0 ? text : "Nothing to preview!"}</p> 
                    </div>
                    </div>
                    <br></br>
                    <div>
                    <div className='card' style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }}>
                    <div className='card-body'>
                    <h5 className ="card-title">Saved</h5>
                    
                    {items.map((items) => {
                       return<>
                       <div className='card-text-body' key = {items.id}>
                        <p className='card-text-saved'>{items.name}</p>
                        <div className='delete-button'>
                        <button className='btn btn-primary'onClick={() => deleteItems(items.id)}><i class="fa-solid fa-trash"></i></button>
                        <button className='btn btn-primary'onClick={() => EditItems(items.id)}><i class="fa-solid fa-pen-to-square"></i></button>
                        </div>
                        
                        </div>
                        </>
                    })}
                    
                    </div>
                    </div>
                </div>
            </div>
            <div className="save-section">

            </div>
        </>
    )
}