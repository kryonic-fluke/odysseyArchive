
# React + Vite



Url is an excellent place for storing ui state sand an alternative to useSState in some situations ,example open/close panel , currently selected list items . list sorting order , applied list filter 


Easy way to store stsate in a global place accessible to all components in the app
  
  makes it possible to bookmark and share the page with the exact ui state it had at the time 

  we use params  to pass data to the next page, and read that data there , without storing the data somewhere
  1 create a brand new route example <Route path="cities/:(name of the param)" element ={component where you will read the data}/>
to get the data from the url , we use useParams hook 
make sure to destructre  const {id}=useParams()

  query strings to store global state so that it is accessible to everyone  
  page?var1={var1value}&var2={var2value} , var1 and var2 cab be read by any one using useSearchParams
  similar to useState , const [initialstate, function to set state] =useSearchParams()
to access the value use get on searchparams
  searchParams.get("var1");

  to change the value pass the new value as an object to 
  setsearchparams({var1:new valu1, var2:newvalue2}), it changes value for all the pages that are using the value , this link is hsareable , and can be bookemarked 


  ----------------------------------------------------------------------------------------------------------------------------------------------------
  programatic navigation : means moving to an url with clicking on any link
  common usecase is right after submitting a form , you want to move to next page 

  example    const navigate= useNavigate()
  navigate("form") , we move to the next page in a imperitive way
  ---------------------------------------------------------------------------------------------------------------------------------------------------
  navigate component :inside nested routes , in index route it is used to redirect to a specific page, use replace to move back to the previous page


---------------------------------------------------------------------------------------------------------------------------------------------------------
About using context api with reducer:
1 when the states are asynchronous we can do dispatch in a asynchronous funciton.
2 if the states are symchronous then we can just pass dispatch funciton to through context , tp respective components
======================================================================================================================================================
entire aapp should not be accessible , if the user is not loged in
--------------------------------------------------------------------------------------------------------------------------
the  BUndle and the code spliting  : bunfdle is the entire code that contains th eapp , is sent by the server on request ,bundle by services like vite

Bundle size optimization : through code spliting , splits the enitre bundle into small js files , which can be downloaded as required this process of loading files sequestly is called lazy loading 

==>split the bundle at page level ,loading each page seperately

cmp npm run build creates  bundle that can be hten dyployed in the server

const HomePage = lazy(()=>import("./pages/home") )
dynamic import function

react suspence api ,suspends components while somethings happens, useually a fallback example spinner suspance encapsulates the entire routes component 

very imprttant feature to inclue in a react app 