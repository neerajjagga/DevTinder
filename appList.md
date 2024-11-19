# DevTinder APIs


## authRouter
~ POST/signup
~ POST/login
~ POST/logout

## profileRouter
~ GET/profile/view    
~ PATCH/profile/edit   (update the profile)
~ PATCH/patch/password

## connectionReqRouter
~ POST/request/send/interested/:userId
~ POST/request/send/ignored/:userId

~ POST/request/review/accepted/:requestId
~ POST/request/review/rejected/:requestId

## userRouter
~ POST/user/connections
~ POST/user/request/received
~ POST/user/feed        (gets you the profile of other users on the platform)


~ Status -> ignore, interested, acceped, rejected
