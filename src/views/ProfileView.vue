<script setup lang="ts">
import LoadingPlaceholder from '@/components/ZLoadingPlaceholder.vue'
import { ProfilesAPI } from '@/services/Profiles'
import type { Profile } from '@/types/Profile'
import { defineAsyncComponent, ref } from 'vue'
import { generateNumberInRange } from '../utils/generateNumberInRange'
const ZProfilePicture = defineAsyncComponent({
    loader: () => import('../components/ZProfilePicture.vue'),
    loadingComponent: LoadingPlaceholder /* shows while loading */,
})
const userProfile = ref<Profile>({} as Profile)

ProfilesAPI.getProfile(generateNumberInRange(1,2)).then((data) => {
    userProfile.value = {
        ...data,
        photo: new URL(data.photo, import.meta.url).href,
    }
})

const GENDER_OPTIONS = {
    '0': { label: 'Male', value: '0' },
    '1': { label: 'Female', value: '1' },
} as const
</script>

<template>
    <main v-if="userProfile">
        <aside class="profile__panel">
            <ZProfilePicture
                :src="userProfile.photo"
                style="margin-block: 2rem"
                :userTag="`'@${userProfile.userTag}'`"
            />
            <span>{{ userProfile?.name }}</span>
            <span>{{ userProfile?.email }}</span>
            <span>{{ userProfile?.DoB }}</span>
            <span>{{
                GENDER_OPTIONS[userProfile?.gender as '0' | '1']?.label
            }}</span>
        </aside>
        <section>
            <h1>Edit Profile</h1>
            <form>
                <div>
                    <label for="username" class="input-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        class="input-wrapper"
                        placeholder="Enter your name"
                        autocomplete="given-name"
                        required
                        pattern=""
                        v-model="userProfile.name"
                    />
                </div>
                <div>
                    <label for="email" class="input-label">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        class="input-wrapper"
                        placeholder="Enter your E-mail"
                        autocomplete="email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        v-model="userProfile.email"
                    />
                </div>
                <div>
                    <label for="Gender" class="input-label">Gender</label>
                    <select
                        class="input-wrapper"
                        id="gender"
                        v-model="userProfile.gender"
                    >
                        <option
                            v-for="{ label, value } in GENDER_OPTIONS"
                            :key="value"
                            :value="value"
                        >
                            {{ label }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="address" class="input-label">Address</label>
                    <input
                        id="address"
                        type="address"
                        class="input-wrapper"
                        placeholder="Enter your address"
                        autocomplete="address-level1"
                        required
                        v-model="userProfile.address"
                    />
                </div>
                <div>
                    <label for="DoB" class="input-label">Date of Birth</label>
                    <input
                        id="address"
                        type="date"
                        class="input-wrapper"
                        placeholder="Enter your DoB"
                        autocomplete="bday"
                        required
                        pattern="\d{1,2}/\d{1,2}/\d{4}"
                        v-model="userProfile.DoB"
                    />
                </div>
            </form>
        </section>
    </main>
</template>

<style lang="scss" scoped>
@import '../assets/base.scss';
$height: calc(70vh - 2rem);
main {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 100%;
}
.profile__panel {
    @extend .flex-column;
    align-items: center;
    background-color: #fff;
    height: $height;
    flex-basis: 15%;
    min-width: 252px;
    flex-shrink: 0;
    box-shadow: $zd-soft-shadow;
    border: 1px solid $zd-secondary-color;
    border-radius: calc($radius * 2);
    margin-block: 1rem;
    & h4 {
        color: $zd-secondary-color;
        font-weight: 600;
        font-size: 1.25rem;
    }
}
section {
    @extend .flex-column;
    gap: 2rem;
    flex-shrink: 0;
    width: min(900px, 100%);
    height: $height;
    border-radius: calc($radius * 2);
    box-shadow: $zd-soft-shadow;
    background-color: #fff;
    padding: 2rem;
    border: 1px solid $zd-secondary-color;
    place-self: center;
    & h1 {
        color: $zd-secondary-color;
    }
}
form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1rem;
    & input,
    select {
        width: min(300px, 100%);
        & > option {
            padding-block: 1rem;
            height: 2rem;
        }
    }
}
aside span {
    font-weight: 600;
    color: #fff;
    margin-block: 0.5rem;
    padding: 0.5rem;
    background-color: $zd-secondary-color;
    border-radius: $radius;
    outline: 2px solid $zd-secondary-color;
    border: 2px solid #fff;
}
</style>
