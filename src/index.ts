import joplin from 'api';

var notedef = '';
var cursorIndex = 0;

joplin.plugins.register({

	onStart: async function() {

    async function getNote(){
      const note = await joplin.workspace.selectedNote();
      const noteBody = note.body;
      notedef = noteBody;
    }

    async function updateNote(){

      const note = await joplin.workspace.selectedNote();

      var i =0;
      while(note.body[i] == notedef[i]){
        i++;
        if(i == note.body.length){
          break;
        }
      }     

      if(note.body.length > notedef.length){
        i = i + (note.body.length-notedef.length);
      }

      console.info('Cursor is at',i)

      cursorIndex = i
      i=0;
      notedef = note.body;

      return cursorIndex;
    }

    await joplin.workspace.onNoteSelectionChange(()=>{
      getNote();
      updateNote();
    });

    await  joplin.workspace.onNoteChange(()=>{
      updateNote();
    });

    getNote();
    updateNote();
	},

});

