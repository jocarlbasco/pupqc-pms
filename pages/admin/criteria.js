import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AdminLayout from '../../components/admin/AdminLayout';
import CriteriaList from '../../components/admin/grid/CriteriaList';
import { fetchCriteria } from '../../components/hooks/Admin/fetch';

// Update this pop-up on admin side
import CriteriaPopup1 from '../../components/faculty/CriteriaPopup1';

import axios from 'axios';
import { toast } from 'react-toastify';
import Processing from '../../components/Processing';
import { MdOutlineCancel } from 'react-icons/md';

function CriteriaScreen() {
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // const [showSecondModal, setShowSecondModal] = useState(false);

  const [criteriaObject, setCriteriaObject] = useState({
    criteria_code: '',
    amount: 0,
  });

  const {
    data: criteriaList,
    isLoading,
    refetch: refetchCriteriaList,
  } = useQuery(['criteriaList'], fetchCriteria);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      await axios.get('/api/admin/criteria/code', {
        params: {
          name: data.code,
        },
      });
      // Handle successful response
      setCriteriaObject({ criteria_code: data.code, amount: data.amount });
      setShowFirstModal(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AdminLayout title="Criteria">
      <div className="bg-white p-10 rounded-xl">
        <h1 className="text-h4 text-primary">Criteria</h1>
        <p className="mb-3 text-black-600">
          <span className="font-semibold"> NOTES:</span> Criteria Code must be
          in the format: 4 letters - 3 numbers e.g. CRIT-001
        </p>

        <div className="flex flex-col items-end gap-3">
          <div className="mb-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full flex gap-3">
                <div className="w-2/6">
                  <input
                    type="text"
                    placeholder="Criteria Code (CRIT-001)"
                    id="code"
                    // onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg   outline-none block p-2.5 ${
                      errors.code
                        ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                    }`}
                    {...register('code', {
                      required: 'This field is required',
                      maxLength: { value: 8, message: '8 characters' },
                      pattern: {
                        value: /^[A-Z]{4}-\d{3}$/,
                        message: 'The pattern XXXX-000 is required',
                      },
                    })}
                  />
                </div>
                <div className="w-2/6">
                  <input
                    type="number"
                    placeholder="Criteria Amount"
                    id="amount"
                    // onChange={(e) => setAmount(e.target.value)}
                    className={`w-full bg-gray-50 border text-gray-900 text-sm rounded-lg   outline-none block p-2.5 ${
                      errors.amount
                        ? 'border-red-500/[.55]  focus:ring-red-500 focus:border-red-500 '
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 '
                    }`}
                    {...register('amount', {
                      required: 'This field is required',
                      min: {
                        value: 1,
                        message: 'Must be a number 1-9',
                      },
                      max: {
                        value: 9,
                        message: 'Less than 10 only',
                      },
                    })}
                  />
                </div>

                <div className="w-2/6">
                  <input type="submit" className="btn-primary" />
                </div>
              </div>
              <div className="w-full flex gap-3">
                <div className="w-2/6">
                  {errors.code && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.code.message}
                    </p>
                  )}
                </div>
                <div className="w-2/6">
                  {errors.amount && (
                    <p className="text-sm font-poppins text-red-500 ">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="mb-6 w-full">
            {isLoading ? (
              'Loading...'
            ) : (
              <CriteriaList criteria={criteriaList?.data} />
            )}
          </div>
        </div>
      </div>
      {showFirstModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-md p-10 m-8 h-1/2 w-full md:w-10/12 lg:w-6/12 overflow-y-auto">
            <button
              className="float-right text-2xl"
              onClick={() => setShowFirstModal(false)}
            >
              <MdOutlineCancel />
            </button>

            <CriteriaPopup1
              amount={criteriaObject.amount}
              code={criteriaObject.criteria_code}
              setShowFirstModal={setShowFirstModal}
              reset={reset}
              refetchCriteriaList={refetchCriteriaList}
            />
          </div>
        </div>
      )}
      {isProcessing && <Processing text="Checking the criteria code" />}
    </AdminLayout>
  );
}

CriteriaScreen.auth = {
  role: 'admin',
};

export default CriteriaScreen;
