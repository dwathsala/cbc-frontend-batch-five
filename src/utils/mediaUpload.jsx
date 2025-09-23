const url = "https://zufnjkshbpewbmbsbviy.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1Zm5qa3NoYnBld2JtYnNidml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MjgzMTMsImV4cCI6MjA3NDEwNDMxM30.RAmYTgvIB4RTRtA8vsauO8M2jzm0_r9jl-mv-cEXxVg";

const supabase = createClient(url, key); //make connection with supabase

export default function mediaUpload(file){

    const mediaUploadPromose = new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("No file selected");
                return;
            }

            const timestamp = new Date().getTime();
            const newName = timestamp + "-" + file.name;
            
            supabase.storage.from("images").upload(newName, file, {
            upsert: false,
            cacheControl: '3600',
        }).then((res)=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(newName).data.publicUrl
            console.log(publicUrl);
            resolve(publicUrl);
        
        }).catch((e)=>{
            console.log(e);
            reject("error occured in supabase connection");
        })


        }
    )

    return mediaUploadPromose;
}

