import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist";
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
import ImageTool from '@editorjs/image'
import TextAlign from "@canburaks/text-align-editorjs"



export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    tunes: ['anyTuneName']
  },
  image: {
      class: ImageTool,
      config: {
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByFile(file){
            // your own uploading logic here
              console.log(file)
              
          },
          uploadByUrl(url){
            // your ajax request for uploading
              console.log(url)
          }
        },
        endpoints: {
          byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
        }
      },
      tunes: ['anyTuneName'],
    },
  anyTuneName: {
      class:AlignmentTuneTool,
      config:{
        default: "left",
        blocks: {
          header: 'center',
          list: 'right'
        }
      },
    },

  checkList: {
    class: CheckList,
    tunes: ['anyTuneName'],
  },
  list: {
    class: List,
    tunes: ['anyTuneName'],
  },
  header: {
      class: Header,
      tunes: ['anyTuneName'],
    },
  delimiter: Delimiter,
  link: {
    class: Link,
    tunes: ['anyTuneName'],
  },
};