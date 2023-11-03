<template>
  <nav class="text-black bg-white w-full border-b border-gray-300 sticky top-0 left-0 z-20 font-kanit">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center">
        <MenuLink to="/">
          <span class="text-xl font-semibold whitespace-nowrap">
            HERE
            <span class="text-3xl">WE</span>
            GO
          </span>
        </MenuLink>
      </div>

      <div class="flex items-center justify-center w-full md:w-auto ">
        <input type="text" v-model="searchTerm" @input="search" placeholder=""
          class="block py-2.5 mr-3 text-m text-gray-900 rounded-lg w-80 h-9 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
        <button>
          <img src="@/assets/images/icon/search.png" class="w-6 h-6" />
        </button>
      </div>

      <div class="flex items-center space-x-6">
        <div>
          <!-- <MenuLink to="#">
            <button
              class="mr-4 inline-flex items-center px-6 py-1.5 text-sm font-medium text-center text-blue-500 bg-white rounded-lg border border-blue-500">
              Log in
            </button>
          </MenuLink>
          <MenuLink to="#">
            <button
              class="inline-flex items-center px-6 py-1.5 text-sm font-medium text-center text-white bg-blue-500 rounded-lg border border-blue-500">
              Register
            </button>
          </MenuLink>
        </div> -->

          <div class="flex space-x-6">
            <MenuLink to="#">
              <img src="@/assets/images/icon/create.png" class="w-6 h-6 mt-1.5" />
            </MenuLink>
            <MenuLink to="#">
              <img src="@/assets/images/icon/friend.png" class="w-6 h-6 mt-1.5" />
            </MenuLink>
            <MenuLink to="#">
              <img src="@/assets/images/icon/chat.png" class="w-6 h-6 mt-1.5" />
            </MenuLink>
            <MenuLink to="#">
              <img src="@/assets/images/icon/bell.png" class="w-6 h-6 mt-1.5" />
            </MenuLink>

            <div class="profile-dropdown">
              <!-- Profile Picture -->
              <div @click="toggleDropdown" class="profile-picture">
                <img src="@/assets/images/icon/capture.png" alt="Profile Picture" />
              </div>

              <!-- Dropdown Content -->
              <div class="dropdown-content" :class="{ open: isDropdownOpen }">
                <ul>
                  <li @click="profile">Profile</li>
                  <li @click="logout">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    profile() {

    },
    logout() {

    },
  },
};
</script>

<style scoped>
.profile-dropdown {
  position: relative;
  display: inline-block;
}

.profile-picture {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  display: none;
  z-index: 1;
  transition: all 0.2s;
  width: 100px;
  margin-top: 5px;
}

.dropdown-content.open {
  display: block;
}

.dropdown-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-content li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-content li:hover {
  background-color: #cfcece;
}
</style>