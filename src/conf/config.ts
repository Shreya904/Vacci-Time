const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL), 
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectionPId: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PID),
    appwriteCollectionCid: String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_CID),
}

export default conf 

