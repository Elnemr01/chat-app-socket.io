import User from "../schemas/userSchema.js";
import Message from "../schemas/messageSchema.js";


// get all users to show in the sidebar (except logged in user)

export const getSidebarUsers = async (req, res) => {
    const id=req.user._id;
    try {
        const users= await User.find({_id: {$ne: id}}).select("-password");

        // un seen messages count for each user
        let unSeenMessages = {};
        let promises= users.map( async (user)=> {
            let messages= await Message.find({
                senderId :user._id,
                receiverId: id,
                seen : false,
            })

            if(messages.length > 0) {
                unSeenMessages[user._id] = messages.length;
            }
            
        })

        await Promise.all(promises);

        return res.status(200).json({status: "success", users, unSeenMessages});




    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }


}

// get messages between logged in user and another user

export const getMessages = async (req,res)=> {
    const {id : selectedUserId} = req.params;
    const myId= req.user._id;

    try {
        
        const messages= await Message.find({
            $or : [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })


        // mark messages as seen
        await Message.updateMany({senderId: selectedUserId, receivedId: myId, seen: false}, {seen: true});

        return res.status(200).json({status: "success", messages});

        

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}

// mark messages as seen when user opens the chat with message id

export const markMessagesAsSeen = async (req,res) => {
    try {
        
        let {id}=req.params;

        await Message.findByIdAndUpdate(id,{seen: true});
        
        return res.status(200).json({status: "success", message: "Message marked as seen"});

    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}