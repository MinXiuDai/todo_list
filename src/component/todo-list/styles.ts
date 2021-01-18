import { makeStyles } from '@material-ui/core/styles'


export const useStyles = makeStyles({
  root:{
   display:"flex",
   alignItems:"center",
   flexDirection:"column",
   background:"#fffff",
   "& .MuiInputBase-input":{
      width:500,
      overflow:"auto",
      textOverflow:"ellipsis",
   },
   },
  title: {
   fontSize:32,
   fontWeight:900,
   textAlign:"center"
  },

  textField:{
   padding:5,
   textAlign:"center",
  },

  flexContent:{
   display:"flex",
   overflow: "auto"
  },

  checkTrue:{
   padding:8,
   overflow:"auto",
   textOverflow:"ellipsis",
   width:688,


   "& .MuiListItem-gutters":{
   boxShadow:"0px 0px 3px 0px #888888",
   marginTop:8,
   }
  },

  checkFalse:{
   marginLeft:"50px",
   overflow:"auto",
   width:336,
   textOverflow:"ellipsis",
   padding:8,

   "& .MuiListItem-gutters":{
   boxShadow:"0px 0px 3px 0px #888888",
   background:"#FEFCFC",
   marginTop:8,
   }
  },

  spanList:{
   fontSize:28,
   fontWeight:500,
   marginLeft:50,
  },
  spanTrueList:{
   fontSize:28,
   fontWeight:500,
  },
  titleText:{
   minWidth:500,
   border:0,
   background:0,
   fontSize:16,
   fontWeight:500,
   resize:"none",
   marginTop:5
  },

  falseItem:{
   textDecoration:"line-through",
   wordWrap: "break-word",
   width:200
  },

  addInput:{
   resize:"none",
   width:300,
   height:100,
   display:"flex",
   alignItems:"center",
  },
  

  })
  