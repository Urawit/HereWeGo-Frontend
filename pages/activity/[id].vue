<template>
    <div v-if="pending">
        Pending...
    </div>

    <div class="bg-gray-100 min-h-screen">
        <!-- Text Header -->
        <header class="w-full container mx-auto">
            <div class="flex flex-col items-center py-12">
                <a class="font-bold text-gray-800 uppercase hover:text-gray-700 text-4xl">
                    {{ activity.activity.name }}
                </a>
            </div>
        </header>


        <div class="container mx-auto flex flex-wrap py-6">
            <!-- side content -->
            <aside class="w-full md:w-1/4 flex flex-col items-center px-3">

                <div class="w-full bg-white shadow flex flex-col my-4 p-6 rounded-lg">
                    <p class="pb-2"> <i class="far fa-calendar-alt "></i> {{
                        formatDateTime(activity.activity.start_date) }}</p>
                    <p class="pb-2"> <i class="fa-regular fa-clock"></i> {{ formatTime(activity.activity.start_date) }}
                        - {{ formatTime(activity.activity.end_date) }}</p>
                    <p class="pb-2"> <i class="fa-solid fa-map-pin"></i> {{ activity.activity.location }} </p>

                </div>

                <div v-if="isMemberBoolean" class="w-full bg-white shadow flex flex-col my-4 p-6 rounded-lg">
                    <p class="text-xl font-semibold pb-5"></p>
                    <div class="grid grid-cols-3 gap-3">

                        <div v-for="user of users" :key="user.id" class="mb-4">
                            <nuxt-link :to="`/profile/${user.id}`">
                                <img v-if="user.image_path" class="profile-picture"
                                    :src="`http://localhost/${user.image_path}`">
                                <img v-else src="@/assets/images/user-default.jpg" class="profile-picture">
                            </nuxt-link>
                        </div>

                        <!-- Leave the third column as is or add content as needed -->
                        <div>
                            <!-- {{ activity.activity.post_image_path }} -->
                        </div>
                    </div>
                    <div class="flex items-center py-2 justify-center">
                            <nuxt-link :to="`/message`">
                                <button class="button-9">
                                    Chat
                                </button>
                            </nuxt-link>
                        </div>
                </div>

                <form @submit.prevent="onSubmit(activity.activity.id)">
                    <button v-if="!isMemberBoolean" type="submit" id="submit" @click="refreshPage" class="button-9">
                        Join
                    </button>

                </form>

            </aside>

            <!-- detail activity -->
            <section class="w-full md:w-2/3 flex flex-col items-center px-3 ml-20">

                <div class="flex flex-col shadow my-4 rounded-lg bg-white">
                    <!-- Activity Image -->
                    <a>
                        <img :src="`http://localhost/${activity.activity.post_image_path}`" class="object-fill h-64 w-[64rem]">
                    </a>
                    <div class=" flex flex-col justify-start p-6">
                        <a class="text-blue-700 text-sm font-bold uppercase pb-4"> {{
                            MasterActivityName }} </a>
                        <a class="text-3xl font-bold  pb-4"> {{ activity.activity.detail}}</a>
                        <a class="text-2xl  pb-4">GOAL : {{ activity.activity.goal }}</a>
                    </div>

                    <form @submit.prevent="onSubmit(activity.activity.id)">
                    <button v-if="!isMemberBoolean" type="submit" id="submit" @click="refreshPage" class="button-9 w-full">
                        Join
                    </button>
                </form>
                </div>

                <div id="Comments" class="bg-[#F8F8F8] h-[105px] z-0 w-full h-[calc(100%-2px)] border-t-2 overflow-auto">
                    <div class="pt-2"></div>

                    <div id="CreateComment" class="bg-white w-full py-6 px-4 shadow my-4 rounded-lg flex ">
                        <div class="border-2 border-[#F1F1F2] bg-[#F1F1F2] flex items-center rounded-lg w-full">
                            <input v-model="newComment" @keyup.enter="postComment(activity.activity.id)" class="bg-[#F1F1F2] text-[14px] focus:outline-none w-full p-2 rounded-lg" type="text" placeholder="Add comment..." />
                        </div>
                        <button @click="postComment(activity.activity.id)" class="button-9 mx-4">
                            Post
                        </button>
                    </div>

                    <div class="mt-6 text-xl text-gray-500">
                        <template v-if="!activity.activity.comments|| activity.activity.comments.length === 0">
                            Be the first to leave a comment !
                        </template>
                        <template v-else>
                        
                            <div v-for="comment in activity.activity.comments" :key="comment.id" class="flex items-center px-10 mt-1">
                                <div class="flex items-center relative w-full" style="margin-right: 20px;">
                                  <img v-if="comment.user.image_path" class="profile-picture"
                                    :src="`http://localhost/${comment.user.image_path}`">
                                  <img v-else src="@/assets/images/user-default.jpg" class="profile-picture">
                                    <div class="ml-5 px-2 py-3">
                                        <div class="text-[20px] font-semibold flex" style="margin-right: 0px;">
                                            <!-- Display the user's name here -->
                                            {{ comment.user.username }}
                                        </div>
                                        <!-- Display the comment text here -->
                                        <div class="text-[20px] font-light px-3" v-if="!comment.editing">
                                            {{ comment.comment }}
                                        </div>
                                    </div>
                                    <!-- Add edit and delete functionality here if necessary -->
                                    <div class=" items-center ml-auto">
                                        <template v-if="comment.user.id === auth.user.id">
                                            <button @click="editComment(comment)" class="text-gray-400 hover:text-gray-600 px-7" >
                                                <i class="fas fa-edit"></i>
                                            </button>

                                            <div v-if="showEditPopup" class="edit-popup">
                                                <div class="edit-popup-content">
                                                    <textarea v-model="editedComment" class="edit-textarea"></textarea>
                                                    <div class="edit-buttons">
                                                    <button @click="saveEditedComment(comment.id, activity.activity.id, editedComment)" class="save-button">Save</button>
                                                    <button @click="cancelEdit" class="cancel-button">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                    

                                            <button @click="deleteComment(activity.activity.id, comment.id)" class="text-gray-400 hover:text-gray-600">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                    <div class="mb-5"></div>
                </div>

            </section>
            
        </div>
    </div>
</template>
  
  

<script setup lang="ts" >
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useAuthStore } from "~/stores/useAuthStore";
  import swal from 'sweetalert';

  const route = useRoute()
  const newComment = ref('');
  const auth = useAuthStore();
  const showEditPopup = ref(false);
  const editedComment = ref('');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json",
      "Authorization": `Bearer ${auth.token}`, 
    }
  }
  const { data: activity, pending } = await useMyFetch<any>(`getActivity/${route.params.id}`,{})
  const { data: members } = await useMyFetch<any>(`get-all-member/${route.params.id}`,{})
  const { data: MasterActivityName } = await useMyFetch<any>(`get-master-activity-name/${activity.value.activity.master_activity_id}`,{})
  const users: any[] = [];
  const { data: isMember } = await useMyFetch<any>(`isMember/${route.params.id}`, {});
  const isMemberBoolean = isMember.value.success;

  console.log("activity",activity.value.activity.comments);

  onMounted(() => {

  });


const formatDateTime = (dateTime: string | number | Date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateTime).toLocaleString(undefined, options);
};
const formatTime = (dateTime: string | number | Date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateTime).toLocaleString(undefined, options);
};


for (const member of members._rawValue) {
    console.log("userid", member)
    const requestData = JSON.stringify({ user_id: member.id });
    const response = await axios.post('http://localhost/api/findUserByID', requestData, options);
    console.log("Find User:", response.data);
    users.push(response.data.user);

}
users.forEach((user, index) => {
    console.log(`User ${index + 1} Data:`, user.id);
});

const refreshPage = () => {
    setTimeout(() => {
        location.reload();
    }, 4000);
};

// To log individual user data within the array:
users.forEach((user, index) => {
  console.log(`User ${index + 1} Data:`, user.id);
});

    console.log("member", activity.value.activity.master_activity_id)

    async function onSubmit(activityId: any) {

        const { data: response, error } = await useMyFetch<any>(`joinActivity/${activityId}`, {
            method: "POST",
        });

        if (isMember.value.success) {
            console.log("member");
            swal("you alredy joined")

        } else {
            console.log("not-member");
            swal({
                title: "SUCCESS!",
                text: "success joined",
                icon: "success"
            });

        }
    }

async function postComment(activitID) {
    if (!newComment.value) {
        return
    }

    const commentData = {
        activity_id : activitID,
        comment: newComment.value
    }

    const response = await axios.post('http://localhost/api/comment', commentData, options);

    if (response.status >= 200 && response.status < 300) {
        newComment.value = ''
        const { data: activity, pending } = await useMyFetch<any>(
                `getActivity/${route.params.id}`,
                {}
        )
    } else {
        console.error('Failed to post comment')
    }
}

async function deleteComment(activityID, commentID) {

    const commentData = {
        activity_id : activityID,
        comment_id : commentID
    }

    const config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${auth.token}`
    },
    data: commentData
};

    try {
        const response = await axios.delete('http://localhost/api/delete-comment', config);
        if (response.status >= 200 && response.status < 300) {
            const { data: activity, pending } = await useMyFetch<any>(
                `getActivity/${route.params.id}`,
                {}
            )
        } else {
            console.error('Failed to delete comment');
        }
    } catch (error) {
        console.error('Error occurred while deleting the comment:', error);
    }
}

async function  editComment(comment) {
    editedComment.value = comment.comment;
    showEditPopup.value = true;
}

async function saveEditedComment(commentID, activityID, comment) {
    const commentData = {
        activity_id: activityID,
        comment: comment,
        comment_id: commentID
    };

    const config = {
        headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${auth.token}`
        }
    };

    try {
        const response = await axios.put(
        'http://localhost/api/edit-comment',
        commentData,
        config
        );
        if (response.status >= 200 && response.status < 300) {
            console.log("done", response);
            showEditPopup.value = false;
            const { data: activity, pending } = await useMyFetch<any>(
                `getActivity/${route.params.id}`,
                {}
            );
        } else {
            console.error('Failed to update comment');
        }
    } catch (error) {
            console.error('Error occurred while updating the comment:', error);
    }
    }

async function  cancelEdit() {
    showEditPopup.value = false;
}


</script>

<style>
.profile-picture {
    width: 67px;
    height: 67px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #a19898;
}

.button-9 {
    appearance: button;
    backface-visibility: hidden;
    background-color: #405cf5;
    border-radius: 6px;
    border-width: 0;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif;
    font-size: 100%;
    height: 44px;
    line-height: 1.15;
    outline: none;
    overflow: hidden;
    padding: 0 25px;
    position: relative;
    text-align: center;
    text-transform: none;
    transform: translateZ(0);
    transition: all .2s, box-shadow .08s ease-in;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}
.edit-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.edit-textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.edit-buttons {
  display: flex;
  justify-content: space-between;
}

.save-button,
.cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button {
  background-color: #4caf50;
  color: #fff;
}

.cancel-button {
  background-color: #f44336;
  color: #fff;
}

</style>