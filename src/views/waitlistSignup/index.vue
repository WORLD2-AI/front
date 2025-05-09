<template>
  <div class="page-container">
    <div class="content-wrapper">
      <header>
        <div>
          <img src="/img/85ea80fd-7496-4e6e-90b5-098f280fbde4.png" alt="" />
        </div>
      </header>
      <!-- title -->

      <h1 class="title">The Next Leap in AI Intelligence</h1>

      <!-- description -->
      <p class="description">
        Your digital assistant now upgrades itself—seamlessly adopting
        breakthroughs so you don't have to.
      </p>

      <!-- form fields -->
      <div class="form-section">
        <p class="form-title">Join the private beta:</p>

        <!-- Input Boxes and Buttons -->
        <div class="form-group-box">
          <div class="form-group">
            <input
              type="email"
              placeholder="Email address"
              class="email-input"
              v-model.number="email"
            />
            <button class="submit-button" @click="handleSubmit">
              Join waitlist
            </button>
          </div>
        </div>
      </div>

      <!-- social link -->
      <div class="social-links">
        <a href="">
          <button class="social-link">
            <img src="/img/github.jpg" alt="" />
            <i>Follow on GitHub</i>
          </button>
        </a>
        <a
          href="/login/login/twitter?callback=http://localhost:5173/#/waitlistSignup"
        >
          <button class="social-link">
            <img src="/img/x.png" alt="" />
            <i>Follow on X</i>
          </button>
        </a>
        <!-- <a href="#" class="social-link">Follow on GitHub</a>
        <a href="#" class="social-link"></a> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const email = ref(null);
const handleSubmit = () => {
  router.push(`/login?email=${email.value}`);
};
</script>

<style lang="scss" scoped>
/* Variable Definition */
$bg-dark: #131313;
$bg-gray: #1f2937;
$text-primary: #ffffff;
$text-secondary: #d1d5db;
$accent-purple: #ffffff;
$accent-hover: #e5e7eb;

/* global container */
.page-container {
  min-height: 100vh;
  background-color: $bg-dark;
  color: $text-primary;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  /* padding: 1.5rem; */
}

/* content area */
.content-wrapper {
  text-align: center;
  header {
    display: flex;
    justify-content: center;
    padding: 1.5rem;
    div {
      margin-top: 1.25rem;
      img {
        width: 5rem;
        height: 5rem;
      }
    }
  }
}

/* title */
.title {
  font-size: 3.75rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.25;
}

/* description */
.description {
  font-size: 1.25rem;
  color: $text-secondary;
  margin-bottom: 2rem;
}

/* form fields */
.form-section {
  background-color: $bg-dark;
  border-radius: 0.75rem;
  /* padding: 1.5rem; */
  margin-bottom: 2rem;
}

.form-title {
  /* font-size: 1.5rem; */
  /* color: $bg-gray; */
  color: rgb(156 163 175);
  margin-bottom: 1rem;
}
.form-group-box {
  display: flex;
  justify-content: center;
  .form-group {
    width: 648px;
    display: flex;
    gap: 1rem;
  }
}

.email-input {
  flex-grow: 1;
  padding: 0.75rem 1rem;
  background-color: #1a2232;
  border: none;
  border-radius: 0.5rem;
  color: $text-primary;
  font-size: 1rem;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px #c4c4c4;
  }
}

.submit-button {
  padding: 0.75rem 1.5rem;
  background-color: $accent-purple;
  /* color: #; */
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: $accent-hover;
  }
}

/* social-links */
.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-link {
  img {
    width: 20px;
    height: auto;
  }
  width: 12rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1.5rem;
  background-color: $bg-dark;
  color: $text-primary;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid $bg-gray;
  cursor: pointer;
  color: $text-secondary;
  transition: color 0.2s;

  &:hover {
    color: $text-primary;
  }
}
</style>