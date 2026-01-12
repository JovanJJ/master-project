

export default async function fetchUser (userId) {
            try {
                const res = await fetch(`/api/settings?id=${userId}`);
                if (!res.ok) throw new Error('Failed to fetch user');
                const data = await res.json();
                
                return data;

            } catch (error) {
                console.log(error);
            }
        }

