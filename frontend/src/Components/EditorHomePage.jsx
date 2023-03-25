import { Button,Form,Container,Row,Col, Stack } from 'react-bootstrap';
import React, { useEffect, useState ,useRef} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadUser,Logout } from '../actions/userActions';
import ImageResize from 'quill-image-resize-module-react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading/Loading';



const EditorHomePage = () => {

  const [imges, setImges] = useState([
    {
      public_id: 'sample',
      url: 'sample'
    }]);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');
  const quillRef = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [Uploading , setUploading] = useState(false);
  const userLogin = useSelector(state=>(state.userLogin))
  const {loading,error,user,message} =userLogin
  
  
  
  
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  useEffect(()=>{
    
    dispatch(LoadUser())
    
    
  },[dispatch])
  
  
  const imageHandler = (e) => {
    setFile(e.target.files[0])
  }

  const handleTagsChange = (tags) => {
    setTags(tags);
    console.log(tags);
  };

 const handleUploadSuccess =async (result) => {
      const img = {
        public_id: result.public_id,
        url: result.secure_url
      }

      imges.push(img);
      setImges(imges);

      console.log(imges);
      const range = quillRef.current.editor.getSelection(true);
      quillRef.current.editor.insertEmbed(range.index, 'image', result.secure_url);
    };

    const cloudName = 'delpjlxfu';
    const uploadPreset = 'qktecqkx';
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: ['local', 'url', 'camera'],
        defaultSource: 'local',

        showLibrary: true,
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#0078FF',
            inactiveTabIcon: '#5A616A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1',
          },
          fonts: {
            default: null,
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          handleUploadSuccess(result.info);
        }
      }
    );
    
    const submit = async () => {

      setUploading(true)
      const config = {
        headers: {
          'Content-Type': "multipart/form-data"
        },
        withCredentials: true
      }

      const obj = new FormData();
      obj.append('file', file);
      obj.append('title', title);
      obj.append('description', description);
      obj.append('content', content);
      obj.append('keywords', tags);
      obj.append('category', selectedCategories);

 try{

      const {data} = await axios.post('https://propergaanda.vercel.app/api/posts/creatPost', obj,config)
      console.log(data);
      if (data.sucsess){
        toast.success("Post Created!")
        setUploading(false)
      }

  }catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    setUploading(false)

  }

}

    let source = '';
    const  handleImageClick = (event) => {

      if(event.target.tagName === 'IMG'){
         source = event.target.getAttribute('src');
        console.log(source);
      }

    }

    const deleteImage = async () => {
      const parser = new DOMParser();
      const serializer = new XMLSerializer();
      const doc = parser.parseFromString(content, 'text/html');

      const images1 = doc.getElementsByTagName('img');
      for (let i = 0; i < images1.length; i++) {
        const src = images1[i].getAttribute('src');
        if (src === source) {
          images1[i].parentNode.removeChild(images1[i]);
        }
      }
      
      for (let i = 0; i < imges.length; i++) {
        if (imges[i].url === source) {
          
          const id = imges[i].public_id;
          
          const config ={
            headers:{
               'Content-Type':'application/json'
            },
            withCredentials:true
       }
       axios.delete('https://propergaanda.vercel.app/api/cloudinary/deleteImg',{data:{ public_id:id}},config)
          imges.splice(i, 1);
          setImges(imges);
          
        }
      }

      const newContent = serializer.serializeToString(doc.body);
      setContent(newContent);
    
    }

    const logout = () => {
      dispatch(Logout())
      
    }
    
    if(loading){
      return <h1>Loading...</h1>
    }


    if (!user || Object.keys(user).length === 0) {
      navigate('/login');
      return null;
    }

    Quill.register("modules/imageResize", ImageResize);
      const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{ 'color': [] }, { 'background': [] }],  
        [{ 'align': [] }],
        ['clean']
      ],
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
     }
    }
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image' ,'color','align','background'
    ]

   const cat = ['Sports','Politics','Technology','Entertainment','Health','Science','Business','Lifestyle']
 
  return (<>
 { Uploading && <Loading/>}
  <Container >

  <Row>
    <Col>
        <Stack>
          <h1 className='mx-auto'>Create Post</h1>
        </Stack>
     </Col>   
  </Row>

  <Row>
    
      <Form>
        <Row>
          <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={(e)=>setTitle(e.target.value)} size='lg' type="text" placeholder="Enter Title" />
          </Form.Group>
          </Col>
          <Col></Col>
        </Row>
          <Form.Group className="mb-3" controlId="ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control rows={3} onChange={(e)=>setDescription(e.target.value)}  as="textarea" placeholder="Enter Description (this will be showed on the main page)" />
          </Form.Group>
        <Row>
          <Col>

            <Form.Group className="mb-3" controlId="picture">
            <Form.Label>Cover Photo</Form.Label>
            <Form.Control onChange={imageHandler} type="file" placeholder="Upload cover image" />

           </Form.Group>

          </Col>
        </Row>
    
          <Form.Group controlId="categories">
          <Form.Label>Categories</Form.Label>
        <Typeahead
          id="public-methods-example"
          labelKey="name"
          allowNew
          multiple
          onChange={setSelectedCategories}
          options={cat}
          selected={selectedCategories}
        />
      </Form.Group>
        

      </Form>
  </Row>


  <Row style={{marginTop:'1rem' , marginBottom:"1rem" }}  >
    <Col sm={12} md={6} >
        <h4>Enter Keywords</h4>
        <TagsInput  value={tags} onChange={handleTagsChange} />
    </Col>
  </Row>

  <Row>
    <Col>     
    <div  onClick={handleImageClick} >

      <ReactQuill theme="snow"
                  modules={modules}
                  formats={formats} 
                  value={content}
                  onChange={setContent}
                  ref={quillRef}
                 
                     />
        
    </div>
        <Button style={{margin:"10px"}} className='m-10' onClick={ () => widget.open() } variant="primary">Upload Image</Button>
        <Button style={{margin:"10px"}} variant='danger' onClick={deleteImage} >Delete Image</Button>
        <Button style={{margin:"10px"}} onClick={submit} variant="primary">Create Post</Button>
        <Button style={{margin:"10px"}} onClick={logout} variant='danger' >Logout</Button>

    </Col>

             
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

  </Row>

    <div>{content}</div>
   
  </Container>

  <ToastContainer 
    position="bottom-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
      



  </>


  )
 
}

export default EditorHomePage
