import React , {useState, useRef} from 'react';
import { useForm } from 'react-hook-form';
import { useGetUser, useLogout } from '../../hooks/useAuth';
import { useUpdateUser } from '../../hooks/useUser';
import { User, Mail, Phone, MapPin, Edit2, X, Check, Camera, Pencil } from 'lucide-react';
import { formateTime } from '../../utils/formateDate';
import ImageUploadDropdown from '../../components/common/ImageUploadDropdown';
import { ChevronLeft, LogOut } from 'lucide-react';
import { useImageField } from '../../hooks/useImageField';

const Profile = () => {
  const { data: userData, isLoading } = useGetUser();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: logout } = useLogout();
  const [isEditing, setIsEditing] = useState(false);
  const profileField = useImageField();
  const posterField = useImageField();
  const posterInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const {
    file: profilePicture,
    remove: removeProfilePicture,
    preview: profilePreview,
    handleUpload: handleProfileUpload,
    handleRemove: handleProfileRemove,
    reset: resetProfile,
  } = profileField;

  const {
    file: posterPicture,
    remove: removePosterPicture,
    preview: posterPreview,
    handleUpload: handlePosterUpload,
    handleRemove: handlePosterRemove,
    reset: resetPoster,
  } = posterField;

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
    }
  });

// Populate form when userData loads
  React.useEffect(() => {
    if (userData?.user && !isEditing) {
      const user = userData.user;
      setValue('fullName', user.fullName || '');
      setValue('phoneNumber', user.phoneNumber || '');
      setValue('address', user.address || '');

      // IMPORTANT: set previews from backend
      resetProfile(user.profilePicture || null);
      resetPoster(user.posterPicture || null);
    }
  }, [userData, setValue, isEditing, resetProfile, resetPoster]);

  const user = userData?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading profile...</div>
      </div>
    );
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    
    if (data.fullName) formData.append('fullName', data.fullName);
    if (data.phoneNumber) formData.append('phoneNumber', data.phoneNumber);
    if (data.address) formData.append('address', data.address);
    
    // Handle profile picture
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    } else if (removeProfilePicture) {
      formData.append('profilePicture', '');
    }
    
    // Handle poster picture
    if (posterPicture) {
      formData.append('posterPicture', posterPicture);
    } else if (removePosterPicture) {
      formData.append('posterPicture', '');
    }

    updateUser(formData, {
      onSuccess: () => {
        setIsEditing(false);
      }
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    resetProfile(user?.profilePicture || null);
    resetPoster(user?.posterPicture || null);
    if (user) {
      setValue('fullName', user.fullName || '');
      setValue('phoneNumber', user.phoneNumber || '');
      setValue('address', user.address || '');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Transparent with blur */}
      <div className="sticky top-0 left-0 right-0 z-20 border-b border-white/20 bg-white/10 backdrop-blur-sm ">
           <div className='grid grid-cols-3 items-center max-w-4xl w-full mx-auto px-4 justify-between'>
             <button onClick={() => window.history.back()} className="flex gap-2 sm:py-6 py-3 text-black [justify-self:left] hover:text-black/80 cursor-pointer"><ChevronLeft /> Back</button>
             <div className='text-center font-semibold text-lg text-black'>Profile</div>
             <div></div>
           </div>
         </div>

       {/* Cover/Poster Section */}
         <div className="relative h-64 sm:h-72 bg-gradient-to-r from-orange-400 to-orange-600 ">
       
         {/* Poster Image */}
         {posterPreview && (
           <img 
             src={posterPreview} 
             alt="Cover" 
             className="w-full h-full object-cover"
           />
         )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Profile Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 relative">
              {/* Poster Edit Buttons */}
                {isEditing && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <ImageUploadDropdown
                      isEditing={isEditing}
                      hasImage={!!posterPreview}
                      onUpload={() => posterInputRef.current?.click()}
                      onRemove={handlePosterRemove}
                      triggerContent={<Camera size={20} className="text-gray-700" />}
                      className="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white rounded-xl shadow-lg transition-colors"
                      position='br'
                    />
                  </div>
                )}
             <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 pt-16 sm:pt-20">
               {/* Avatar */}
               <div className="relative translate-y-1/2 self-start sm:self-auto">
                 <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white bg-orange-50 rounded-full flex items-center justify-center overflow-hidden shadow-xl sm:-mb-2">
                   {profilePreview ? (
                     <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <User size={36} className="sm:size-48 text-orange-500" />
                   )}
                 </div>
                 {isEditing && (
                   <div className="absolute bottom-1 right-1">
                     <ImageUploadDropdown
                       isEditing={isEditing}
                       hasImage={!!profilePreview}
                       onUpload={() => profileInputRef.current?.click()}
                       onRemove={handleProfileRemove}
                       triggerContent={<Pencil className="size-4 text-white " />}
                       className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-orange-500 rounded-full cursor-pointer hover:bg-orange-600 transition-colors shadow-lg"
                     />
                   </div>
                 )}
               </div>

               {/* User Info */}
               <div className="flex-1 max-sm:translate-y-12  pb-2 sm:pb-4 min-w-0">
                 <h1 className="text-xl sm:text-3xl font-bold text-white drop-shadow-lg truncate">{user?.name || 'User'}</h1>
                 <p className="text-white/90 mt-1 drop-shadow text-sm sm:text-base truncate">{user?.email || 'No email provided'}</p>
                 <div className="flex items-center gap-2 mt-2 flex-wrap">
                   <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-semibold capitalize">
                     {user?.role || 'user'}
                   </span>
                   <span className="text-xs text-white/80">
                     Member since {user?.createdAt ? formateTime(user.createdAt) : 'N/A'}
                   </span>
                 </div>
               </div>

               {/* Edit Buttons */}
               <div className="pb-2 sm:pb-4 flex gap-2 self-end sm:self-auto">
                 {!isEditing ? (
                   <button 
                     onClick={() => setIsEditing(true)}
                     className="p-3 bg-white/90 hover:bg-white rounded-xl transition-colors shadow-lg"
                   >
                     <Edit2 size={20} className="text-gray-700" />
                   </button>
                 ) : (
                   <>
                     <button 
                       onClick={handleCancel}
                       className="p-3 bg-white/90 hover:bg-white rounded-xl transition-colors shadow-lg"
                     >
                       <X size={20} className="text-gray-700" />
                     </button>
                     <button 
                       onClick={handleSubmit(onSubmit)}
                       disabled={isPending}
                       className="p-3 bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors disabled:opacity-50 shadow-lg"
                     >
                       {isPending ? (
                         <div className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                       ) : (
                         <Check size={20} className="text-white" />
                       )}
                     </button>
                   </>
                 )}
               </div>
             </div>
          </div>
        </div>
      </div>

       {/* Profile Information */}
       <div className="max-w-4xl mx-auto px-4 py-8 mt-14">
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
           <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <User size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="font-medium text-gray-900">{user?.name || '-'}</p>
              </div>
            </div>

            {/* Full Name */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <User size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Full Name (Alternative)</p>
                {isEditing ? (
                  <input
                    {...register('fullName')}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Enter full name"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{user?.fullName || '-'}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Mail size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="font-medium text-gray-900">{user?.email || '-'}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Phone size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                {isEditing ? (
                  <input
                    {...register('phoneNumber')}
                    type="tel"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{user?.phoneNumber || '-'}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl md:col-span-2">
              <div className="p-2 bg-orange-50 rounded-lg">
                <MapPin size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Address</p>
                {isEditing ? (
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    placeholder="Enter address"
                  />
                ) : (
                  <p className="font-medium text-gray-900">{user?.address || '-'}</p>
                )}
              </div>
            </div>
             {/* Hidden file input */}
             <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file ?? false) {
                  handleProfileUpload(file);
                  e.target.value = '';
                }
              }}
            />
             {/* Hidden file input */}
             <input
              ref={posterInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                
                console.log("file", file, e)
                if (file ?? false) {
                  handlePosterUpload(file);
                  e.target.value = '';
                }
              }}
            />
          </form>
        </div>
              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
             <button
               onClick={() => logout()}
               className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200"
             >
               <LogOut size={18} />
               <span>Logout</span>
             </button>
           </div>
      </div>
    </div>
  );
};

export default Profile;
