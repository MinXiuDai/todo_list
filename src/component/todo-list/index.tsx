import * as React from 'react'
import { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { 
TextField ,
List,
Dialog,
ListItem,
ListItemIcon,
IconButton,
ListItemText,
DialogContent,
DialogTitle,
TextareaAutosize,
         } from '@material-ui/core'
import { Delete } from "@material-ui/icons"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useStyles } from './styles'
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import { map } from 'lodash'
interface ITodoListProps {
    title : string,
    check : boolean
}
export const TodoList = () => {
    const cls = useStyles()
    const [value , setValue] = useState<string>('')
    const [searchValue , setSearchValue] = useState<string>('')
    const [todo , setTodo] = useLocalStorageState<Array<ITodoListProps>>('todoList',[])
    const [contentShow , setContentShow] = useState<boolean>(true)
    const [inputValue , setInputValue] = useState<string>(value)
    const [searchTodo , setSearchTodo] = useState<Array<ITodoListProps>>([])
    const [isShow , setIsShow] = useState(false)
    const [isNullShow , setIsNullShow] = useState(false)

    const searchItem = ( e :any ) => {
        if(e.keyCode === 13){
            const accurateTodo =  todo.filter((item)=> item.title === searchValue)
            setSearchTodo(accurateTodo)
            const fuzzyTodo = todo.filter( item => {
                const itemTitle = item.title
                const itemTerm = itemTitle.toLowerCase()
                const searchTerm = searchValue.toLowerCase()
                return itemTerm.includes(searchTerm)
            })
                setSearchTodo(fuzzyTodo)
            if(searchValue !== '' ){
                setIsShow(true)
                setSearchValue('')
            }
        }
    }

    const addTodo = (e:any)=>{
        if(e.keyCode === 13){
            if(value === ''){
                setIsNullShow(true)
            }else{
                setTodo([...todo,{title:value,check:false}])
                setValue('')
            }
        }
    }

    const contentShowKeyDown = (item:any,e:any) => {
        if(e.keyCode === 13){
            const newTodo = [...todo]
            item.title =  inputValue
            setTodo(newTodo)
            setInputValue('')
            if(newTodo != null){
                setContentShow(true)
            }
        }
    }

    const changeAndSave = ( item:any ,e:any) =>{
        setContentShow(!contentShow)
        const newTodo = [...todo]
        item.title = inputValue
        setTodo(newTodo)
    }

    const deleteTodo = (todoIndex:number) => {
    const newTodo = todo.filter((_,index)=> index !== todoIndex )
       setTodo(newTodo)
    }
    return (
        <div className={cls.root}>
            <div className={cls.title}> Todo List </div >
                <div className={cls.textField}>
                    <TextField
                        className={cls.addInput}
                        onChange={(e)=>setValue(e.target.value)}
                        value={value}
                        onKeyUp={(e)=>addTodo(e)}
                        placeholder="add todo"
                    />

                    <TextField
                        className={cls.addInput}
                        placeholder="search"
                        onChange={(e)=>setSearchValue(e.target.value)}
                        value={searchValue}
                        onKeyDown={(e)=>searchItem(e)}
                    />
                 
                    <Dialog
                        open={isShow}
                        onClose={()=>setIsShow(!isShow)}
                    >
                    <DialogContent>
                        <List>
                            <DialogTitle id="alert-dialog-title">{"The Todo item found in the search !"}</DialogTitle>
                            {
                                map(searchTodo,item=>{
                                    return <ListItem style={{
                                        background:"#458790",
                                        color:"#9DD29F",
                                        borderRadius:4,
                                        marginTop:3
                                    }}>{item.title}</ListItem>
                                })
                            }
                        </List>
                    </DialogContent>
                    </Dialog>

                    <Dialog
                        open={isNullShow}
                        onClose={()=>setIsNullShow(!isNullShow)}
                    >
                       <DialogTitle id="alert-dialog-title">{"Todo must not be empty!"}</DialogTitle>
                    </Dialog>

            </div>
            <div className={cls.flexContent}>
                <div style={{
                    display:"flex",
                    flexDirection:"column"
                    }}>
                    <span className={cls.spanTrueList}>Outstanding items :</span>
                    <List className={cls.checkTrue}>
                    

                        { 
                            map ( todo ,(item , index) => {
                                return(
                                    item.check === false && (
                                        <ListItem  key={index} >
                                            <ListItemIcon
                                                onClick={()=> {
                                                    const newTodo = [...todo]
                                                    item.check = !item.check
                                                    setTodo(newTodo)
                                                }}>
                                            <IconButton><CheckBoxOutlineBlankIcon/></IconButton>
                                            </ListItemIcon>
                                            <ListItemText>
                                            <TextareaAutosize
                                                className={cls.titleText}
                                                defaultValue={item.title}
                                                disabled={contentShow}
                                                onKeyDown={(e)=>{contentShowKeyDown(item,e)}}
                                                onChange={(e)=>{setInputValue(e.target.value)}}
                                            />
                                            </ListItemText>
                                            <IconButton onClick={(e)=>changeAndSave(item,e)}> <ChangeHistoryIcon/> </IconButton>
                                            
                                            <IconButton onClick={()=>deleteTodo(index)}> <Delete/> </IconButton>
                                        </ListItem>
                                    )
                                )

                            })
                        }
                    </List>
                </div>
                <div style={{
                        display:"flex",
                        flexDirection:"column",
                        }}>
                    <div className={cls.spanList}> Completed Items :</div> 
                    <List className={cls.checkFalse}>
                        
                        {
                            map ( todo , (item , index) => {
                                return(
                                    item.check === true && (
                                        <ListItem  key={index} >
                                            <ListItemIcon 
                                                onClick={()=> {
                                                    const newTodo = [...todo]
                                                    item.check = !item.check
                                                    setTodo(newTodo)
                                                }}>
                                            <IconButton><CheckBoxIcon/></IconButton>
                                            </ListItemIcon>
                                            <ListItemText 
                                                className={cls.falseItem}
                                                >{item.title}
                                            </ListItemText>
                                            <IconButton onClick={()=>deleteTodo(index)}><Delete/></IconButton>
                                        </ListItem>
                                    )
                                )

                            })
                        }
                    </List>
                </div>
            </div>
        </div>
    )


}