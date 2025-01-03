import { createClient } from 'next-sanity';
export const client = createClient({
    projectId:"lenovo",
    dataset:'production',
    useCdn: true,
    apiVersion:'2022-11-15',
    token: "skjUl7iQKzvuYrWbOqwd5ov3YVbgaF0BtEVKggNnexP3kWgnUFiM5h41Qi6jL7ih6WPT4wLsuGzduhjKd9ws9e2zUZKFgnl8DzwKlkQmOIdzcfFHiRlvJl3quvAGpIUx4EkQ5sCs2foRDBicGss3DoqMSyqnAtOJihoC59wYo2xss5jF6oXV"
})