import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostPayload } from 'src/app/models/create-post.payload';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url="http://127.0.0.1:8087";
  constructor(private http : HttpClient) { }

  getAllPosts(): Observable<any>{

        const headers = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+localStorage.getItem('token')
      })
      
    return this.http.get(this.url+"/SpringMVC/post/retrieve-posts", { headers:headers });
  }
  
  getPost(id: number): Observable<Post> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    console.log('salaam');
    return this.http.get<Post>(this.url+"/SpringMVC/post/retrieve-post/" + id, { headers:headers });
  }
  uploadImage(uploadImageData: FormData, postId: any){
    const headers = new HttpHeaders({ 
      
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    return this.http.post(this.url + '/SpringMVC/post/uploadPostFile/'+postId, uploadImageData, {responseType:"text", headers:headers });
  }
  loadImage(fileName:any) {
    const headers = new HttpHeaders({ 
      
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    return this.http.get(this.url + '/SpringMVC/post/getPostFile/' + fileName, {responseType:"text", headers:headers });

  }
  
  createPost(postPayload: Post): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    console.log('kbal el requete');
    return this.http.post(this.url+'/SpringMVC/post/add-post/', postPayload , {headers : headers});
  }
  createPostCommunity(postPayload: Post, comid : number): Observable<any> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    console.log('kbal el requete');
    return this.http.post(this.url+'/SpringMVC/post/add-post-com/'+comid, postPayload , {headers : headers});
  }
  deletePost(id: number) {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem('token')
    })
    console.log('delete');
    return this.http.delete(this.url+"/SpringMVC/post/remove-post/" + id, { headers:headers });
  }
}
