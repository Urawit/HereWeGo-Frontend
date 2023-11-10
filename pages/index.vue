<template>
  <div class="bg-gray-0 min-h-screen">

    <div class="flex items-center justify-center w-full md:w-auto "
      style="padding-top: 75px; padding-bottom: 0px; padding-left: 20px; padding-right: 20px;">
      <input type="text" v-model="searchTerm" @input="search" placeholder="Search Activity names"
        class="block py-2 pr-2 pl-4 text-m text-gray-900 rounded-lg w-96 h-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        style="padding-top: 0px; padding-bottom: 2px; padding-left: 6px; padding-right: 20px;" />
      <button class="mx-2 group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-8 transition duration-500 ease-in-out group-hover:scale-125">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="invisible group-hover:scale-105 group-hover:visible group-hover:animate-[move_35s_linear_infinite] group-hover:stroke-blue-600" stroke-dasharray="50"  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <div class="hidden group-hover:block group-hover:translate-y-1 -mx-3 mt-3 absolute bg-gray-400 text-white rounded px-2 py-1 text-sm whitespace-nowrap">
            <span>
              Search
            </span>
        </div>
      </button>
    </div>

    <div class="flex items-center justify-center w-full my-10">
      <div class="pb-1 text-center flex items-center" style="padding-right: 8px;">
        <button @click="toggleFavoritesFilter" class="rounded-full bg-gray-200 cursor-pointer transition-all duration-500 ease-in-out hover:ring-2 hover:ring-[#FFD700] hover:ring-offset-base-100 hover:ring-offset-2 peer-focus:scale-125 p-1.5"
          :title="showOnlyFavoritesFlag ? 'Cancel Favorites Filter' : 'Favorite Activities'">
          <Icon name="bx:bxs-bookmarks" size="40" :color="showOnlyFavoritesFlag ? '#FFD700' : ''" />
          <span class="text-xs pl-1 pr-4 text-gray-800 font-semibold" style="padding-right: 25px;">Favorite
            Activities</span>
        </button>
      </div>

      <div class="pb-1 text-center flex items-center" style="padding-right: 4px;">
        <button @click="toggleMyActivitiesFilter" class="rounded-full bg-gray-200 cursor-pointer transition-all duration-500 ease-in-out hover:ring-2 hover:ring-[#59C8F8] hover:ring-offset-base-100 hover:ring-offset-2 peer-focus:scale-125 p-1.5"
          :title="showOnlyMyActivitiesFlag ? 'Cancel My Activites Filter' : 'Activities you have joined'">
          <Icon name="bx:bxs-user-circle" size="40" :color="showOnlyMyActivitiesFlag ? '#59C8F8' : ''" />
          <span class="text-xs pl-1 pr-4 text-gray-800 font-semibold" style="padding-right: 25px;">My Activities</span>
        </button>
      </div>

      <div class="pb-1 text-center flex items-center" style="padding-right: 4px;">
        <button @click="toggleMyCreationFilter" class="rounded-full bg-gray-200 cursor-pointer transition-all duration-500 ease-in-out hover:ring-2 hover:ring-[#ff0000] hover:ring-offset-base-100 hover:ring-offset-2 peer-focus:scale-125 p-1.5"
          :title="showOnlyMyCreationFlag ? 'Cancel My Activites Filter' : 'Activities you have created'">
          <Icon name="bx:bxs-cog" size="40" :color="showOnlyMyCreationFlag ? '#ff0000' : ''" />
          <span class="text-xs pl-1 pr-4 text-gray-800 font-semibold" style="padding-right: 25px;">My Creation</span>
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-20 py-20">

      <div class="grid grid-cols-4 gap-10">
        <div v-for="activity in activities" :key="activity.id"
          class="rounded-lg overflow-hidden bg-white shadow-md border-2 hover:border-blue-500 border-gray-300 transition-transform transform hover:scale-105">
          <div>
            <nuxt-link :to="`/activity/${activity.id}`">
              <div>
                <img v-if="activity.post_image_path" :src="`http://localhost/${activity.post_image_path}`"
                  alt="Card Image" class="w-full h-60 object-cover" />
                <img v-else src="@/assets/images/default-image.png" alt="Card Image"
                  class="w-full h-60 object-cover p-12" />
                <div class="p-4">
                  <h2 class="text-xl font-bold text-blue-500 line-clamp-1">
                    {{ activity.name }}
                  </h2>
                  <p class="text-sm mt-1.5 font-bold line-clamp-1">
                    {{ activity.master_name }}
                  </p>
                  <p class="text-sm mt-1.5">{{ activity.maximum }} PEOPLE</p>
                  <p class="text-sm mt-1.5 line-clamp-1">
                    {{ activity.location }}
                  </p>
                  <p class="text-sm mt-1.5">
                    {{
                      new Date(activity.start_date).getDate().toString().padStart(2, '0') +
                      ' ' +
                      new Date(activity.start_date).toLocaleString('en-US', {
                        month: 'short',
                      }) +
                      ' ' +
                      new Date(activity.start_date).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    }}
                  </p>
                </div>
              </div>
            </nuxt-link>

            <div class="flex items-center px-3 mt-1">
              <div class="pb-4 text-center flex items-center" style="padding-right: 4px;">
                <button @click="isliked(activity) ? unlikePost(activity.id) : likePost(activity.id)"
                  class="rounded-full bg-gray-100 cursor-pointer transition duration-500 ease-in-out hover:scale-110 hover:ring-2 hover:ring-[#F02C56] hover:ring-offset-base-100 hover:ring-offset-2 peer-focus:scale-110" :title="isliked(activity) ? 'Unlike' : 'Like'">
                  <Icon name="bx:bxs-heart" size="40" :color="isliked(activity) ? '#F02C56' : ''"
                    style="padding-top: 6px; padding-bottom: 6px; padding-left: 6px; padding-right: 6px;" />
                </button>

                <span class="text-xs pl-1 pr-4 text-gray-800 font-semibold mx-1" style="padding-right: 15px;"> {{
                  activity.likes.length }}</span>

              </div>
              <div class="pb-4 text-center flex items-center" style="padding-right: 4px;">
                <button @click="navigateTo(`/activity/${activity.id}`)" class="rounded-full bg-gray-200 cursor-pointer transition duration-500 ease-in-out hover:scale-110 hover:ring-2 hover:ring-blue-500 hover:ring-offset-base-100 hover:ring-offset-2 peer-focus:scale-110"
                  title="Comment">
                  <Icon name="bx:bxs-message-rounded-dots" size="40" :color="isLiked ? '#F02C56' : ''"
                    style="padding-top: 0px; padding-bottom: 2px; padding-left: 6px; padding-right: 6px;" />
                </button>

                <span class="text-xs pl-1 pr-4 text-gray-800 font-semibold mx-1" style="padding-right: 35px;">{{
                  activity.comments.length }}</span>

              </div>
              <div class="pb-4 text-center flex items-center" style="padding-right: 4px;">
                <button @click="isSaved(activity) ? unSavedPost(activity.id) : savedPost(activity.id)"
                  class="rounded-full bg-gray-200 cursor-pointer -mx-5 group transition duration-500 ease-in-out hover:scale-110 hover:ring-2 hover:ring-[#FFD700] hover:ring-offset-base-100 hover:ring-offset-2 peer-focus:scale-110" :title="isSaved(activity) ? 'Unsaved' : 'Saved'">
                  <Icon name="bx:bxs-bookmark-star" class="fill-[#FFD700]" size="40" :color="isSaved(activity) ? '#FFD700' : ''"
                    style="padding-top: 0px; padding-bottom: 2px; padding-left: 6px; padding-right: 6px;" />
                </button>

                <span class="text-xs pl-1 pr-4 text-gray-800 font-semibold mx-6" style="padding-right: 0px;">{{
                  activity.favorites.length }}</span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPopup" class="popup">
      <div class="flex items-center">
        <box-icon name='check-circle' type='solid' color='#36d232'></box-icon>
        <Icon name="bx:bxs-check-circle" size="45" type='solid' color='#36d232' />
        <p class="ml-1">Saved! Added to favorites.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useAuthStore } from "~/stores/useAuthStore";
import { ref, onMounted, onUpdated } from 'vue';
import { useRouter } from 'vue-router';

const activities = ref([]);
const searchTerm = ref('');
const router = useRouter();
const showPopup = ref(false);
const auth = useAuthStore();
const showOnlyFavoritesFlag = ref(false);
const showOnlyMyActivitiesFlag = ref(false);
const showOnlyMyCreationFlag = ref(false);
const options = {
  headers: {
    'Content-Type': 'application/json',
    "Accept": "application/json",
    "Authorization": `Bearer ${auth.token}`,
  }
}

onMounted(() => {
  if (auth.isLogin) {
    getAllActivities();
  } else {
    navigateTo('/login');
  }
});

const search = () => {
  if (searchTerm.value === '') {
    getAllActivities();
  } else {
    activities.value = activities.value.filter(activity => activity.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
  }
};

const getAllActivities = async () => {
  try {
    const response = await axios.get('http://localhost/api/getActiveActivities', options);
    console.log("activities:", response.data.activities);
    response.data.activities.forEach(activity => {
      // console.log("Likes:", activity.likes);
      // console.log("like or not:", activity.likes.user_id ,"compareto", auth.id ,activity.likes.some(like => like.user_id === auth.id));
      // console.log("Comments:", activity.comments);
      // console.log("Favorites:", activity.favorites);
    });
    activities.value = response.data.activities;
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

const toggleFavoritesFilter = () => {
  console.log("Toggle fav activities filter called");
  if (showOnlyFavoritesFlag.value) {
    console.log("refresh");
    getAllActivities();
  } else {
    console.log("fil fav");
    showOnlyFavorites();
  }
  showOnlyFavoritesFlag.value = !showOnlyFavoritesFlag.value;
};

const toggleMyActivitiesFilter = () => {
  console.log("Toggle my activities filter called");
  if (showOnlyMyActivitiesFlag.value) {
    getAllActivities();
  } else {
    showOnlyMyActivities();
  }
  showOnlyMyActivitiesFlag.value = !showOnlyMyActivitiesFlag.value;
};

const toggleMyCreationFilter = () => {
  if (showOnlyMyCreationFlag.value) {
    getAllActivities();
  } else {
    showOnlyMyCreation();
  }
  showOnlyMyCreationFlag.value = !showOnlyMyCreationFlag.value;
};

const showOnlyFavorites = () => {
  activities.value = activities.value.filter(activity => isSaved(activity));
}

const showOnlyMyCreation = () => {
  activities.value = activities.value.filter(activity => activity.user_id === auth.user.id);
}

const showOnlyMyActivities = () => {
  activities.value = activities.value.filter(activity => {
    return activity.activity_members.some(member => member.user_id === auth.user.id);
  });
};



const navigateTo = (route) => {
  router.push(route);
};

const isliked = (activity) => {
  return activity.likes.some(like => like.user_id === auth.user.id);
}

const likePost = async (activityID) => {
  const requestData = JSON.stringify({ activity_id: activityID });
  try {
    const response = await axios.post('http://localhost/api/like', requestData, options);
    getAllActivities();
  } catch (error) {
    console.log(error)
  }
}

const unlikePost = async (activityID) => {
  const requestData = JSON.stringify({ activity_id: activityID });
  try {
    const response = await axios.delete('http://localhost/api/unlike', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      data: requestData,
    });
    getAllActivities();
  } catch (error) {
    console.error('Error in deleting post:', error);
  }
};

const isSaved = (activity) => {
  return activity.favorites.some(favorite => favorite.user_id === auth.user.id);
}

const savedPost = async (activityID) => {
  const requestData = JSON.stringify({ activity_id: activityID });
  try {
    const response = await axios.post('http://localhost/api/favorite', requestData, options);
    getAllActivities();
    showPopup.value = true;
    setTimeout(() => {
      showPopup.value = false;
    }, 4500);
  } catch (error) {
    console.log(error)
  }
}

const unSavedPost = async (activityID) => {
  const requestData = JSON.stringify({ activity_id: activityID });
  try {
    const response = await axios.delete('http://localhost/api/unfavorite', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      data: requestData
    });
    getAllActivities();
  } catch (error) {
    console.log(error)
  }
};
    
</script>

<style>
.popup {
  position: fixed;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}

.heart-icon {
  height: 100px;
  width: 100px;
  background: url("@/assets/images/heart.png");
  background-position: left;
  cursor: pointer;
  position: absolute;
}


.like-button .heart-icon.liked {
  animation: like-anim 1.4s step(28) forwards;
}

@keyframes like-anim {
  to {
    background-position: right;
  }
}

.heart-bg {
  background: rgba(255, 192, 200, 0);
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease;
}

.like-button .heart-bg:hover {
  background: rgba(255, 192, 200, 0.7);
}

.like-button {
  display: flex;
  align-items: center;
}

.like-button .likes-amount {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  color: #888;
  font-weight: 900;
  margin-left: 70px;
}
</style>
