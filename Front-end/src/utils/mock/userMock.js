import { API_URL } from "../constants";

export function updateUserMock() {
  this.patch(API_URL + "/user", () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRvbm5pZSIsImVtYWlsIjoiYm9uam91ckB0ZXN0LmZyIiwiaWF0IjoxNjMyMzg3ODA0LCJleHAiOjE2MzIzOTE0MDR9.OyoSBwav9qiZ3f1H879HE4SF4UsENkSVpTjlNsiXOXY";
  });
}
