to disable js ctrl +shift +p

what is suspence: use to isolate /catch component that are not ready to be rendered (suspending)/ doing some async operation 

cause of suspending : fetching data , loading code (with react lazy loading)

the component that is going to be suspended is wrapped into a sub tree (suspence)

dynamic route segment : filled at request time 
global error boundary wraps entire app (always always a client component)  Note : only rendering errors are caught , not in root layout too, we need global-error

not found error cna be triggered manually using function  