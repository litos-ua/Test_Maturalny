import type {
  DataProvider,
  RaRecord,
  GetOneParams,
  GetOneResult,
  GetManyParams,
  GetManyResult,
  GetManyReferenceParams,
  GetManyReferenceResult,
  CreateParams,
  CreateResult,
  UpdateParams,
  UpdateResult,
  UpdateManyParams,
  UpdateManyResult,
  DeleteParams,
  DeleteResult,
  DeleteManyParams,
  DeleteManyResult
} from "react-admin";

import { get, post, put, del } from "../api";
import { tokenService } from "../services";

const API_BASE_URL = '/admin';

interface ListResponse<RecordType> {
  data: RecordType[];
  total?: number;
  headers?: {
    [key: string]: any;
  };
}

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  ...(tokenService.getAccessToken() && {
    Authorization: `Bearer ${tokenService.getAccessToken()}`
  })
});

// вспомогалка для нормализации id/Id
const normalizeId = <T extends RaRecord | { Id?: any }>(rec: T): RaRecord => {
  if (!rec) return rec as unknown as RaRecord;
  const anyRec = rec as any;
  if (anyRec.id != null) return anyRec;
  if (anyRec.Id != null) {
    const { Id, ...rest } = anyRec;
    return { ...rest, id: Id };
  }
  return anyRec;
};

const dataProvider: DataProvider = {

  async getList(resource, params) {
    // 1. Определяем, это ReferenceInput для выбора темы в вопросе
    const isTopicReferenceInput = 
        resource === 'topics' && 
        params.filter?.disciplineId && 
        Object.keys(params.filter).length === 1;

    // 2. Подготавливаем параметры запроса
    const query = {
        _page: params.pagination?.page || 1,//_page: isTopicReferenceInput ? 1 : (params.pagination?.page || 1),
        _perPage: isTopicReferenceInput ? 1000 : (params.pagination?.perPage || 10),
        _sort: params.sort?.field === "id" ? "Id" : params.sort?.field || "Id",
        _order: params.sort?.order || 'ASC',
        ...(params.filter && { filter: JSON.stringify(params.filter) })
    };

    // 3. Отправка запроса (без изменений)
    try {
        const response = await get(`${API_BASE_URL}/${resource}`, {
            params: query,
            headers: getAuthHeaders()
        });

        return {
            data: response.data.map(normalizeId),
            total: response.total || response.data.length
        };
    } catch (error) {
        console.error('Error in getList:', error);
        throw error;
    }
},


async getOne<RecordType extends RaRecord>(
  resource: string,
  params: GetOneParams
): Promise<GetOneResult<RecordType>> {
  try {
    const response = await get<RecordType>(`${API_BASE_URL}/${resource}/${params.id}`, {
      headers: getAuthHeaders()
    });

    const normalizedData = {
      ...response,
      id: response.id || response.Id 
    };

    if ('Id' in normalizedData) {
      const { Id, ...dataWithoutId } = normalizedData;
      return { data: dataWithoutId as RecordType };
    }

    return { data: normalizedData as RecordType };

    } catch (error) {
      console.error('Error in getOne:', error);
      throw error;
    }
  },


async getMany<RecordType extends RaRecord>(
  resource: string,
  params: GetManyParams
): Promise<GetManyResult<RecordType>> {
  try {
    const response = await get<{ data: RecordType[] }>(
      `${API_BASE_URL}/${resource}`,
      {
        params: { id: params.ids.join(',') },
        headers: getAuthHeaders()
      }
    );

    return { data: response.data }; // тут data уже массив
  } catch (error) {
    console.error('Error in getMany:', error);
    throw error;
  }
},


async getManyReference<RecordType extends RaRecord>(
  resource: string,
  params: GetManyReferenceParams
): Promise<GetManyReferenceResult<RecordType>> {
  try {
    const { page = 1, perPage = 10 } = params.pagination || {};
    const { field = 'Id', order = 'ASC' } = params.sort || {};

    const query = {
      [params.target]: params.id,
      _page: page,
      _perPage: perPage,
      _sort: field === 'id' ? 'Id' : field, 
      _order: order,
    };

    const response = await get<ListResponse<RecordType>>(`${API_BASE_URL}/${resource}`, { 
      params: query,
      headers: getAuthHeaders()
    });

    const normalizedData = response.data.map(item => ({
      ...item,
      id: item.id || item.Id 
    }));

    return {
      data: normalizedData as RecordType[],
      total: parseInt(response.headers?.["x-total-count"], 10) || normalizedData.length,
    };
  } catch (error) {
    console.error('Error in getManyReference:', error);
    throw error;
  }
},

async create<RecordType extends RaRecord>(
  resource: string,
  params: CreateParams<RecordType>
): Promise<CreateResult<RecordType>> {
  try {
    const response = await post<RecordType>(
      `${API_BASE_URL}/${resource}`,
      params.data,
      getAuthHeaders()
    );

    return { data: normalizeId(response) as RecordType };
  } catch (error) {
    console.error('Error in create:', error);
    throw error;
  }
},


async update<RecordType extends RaRecord>(
  resource: string,
  params: UpdateParams<RecordType>
): Promise<UpdateResult<RecordType>> {
  try {
    const response = await put<RecordType>(
      `${API_BASE_URL}/${resource}/${params.id}`,
      params.data,
      getAuthHeaders()
    );
    return { data: normalizeId(response) as RecordType };
  } catch (error) {
    console.error('Error in update:', error);
    throw error;
  }
},


async updateMany<RecordType extends RaRecord>(
  resource: string,
  params: UpdateManyParams<RecordType>
): Promise<UpdateManyResult<RecordType>> {
  try {
    await Promise.all(
      params.ids.map(id => 
        put(`${API_BASE_URL}/${resource}/${id}`, params.data, getAuthHeaders())
      )
    );
    return { data: params.ids };
  } catch (error) {
    console.error('Error in updateMany:', error);
    throw error;
  }
},

async delete<RecordType extends RaRecord>(
  resource: string,
  params: DeleteParams<RecordType>
): Promise<DeleteResult<RecordType>> {
  try {
    // Сервер часто отвечает 204 No Content -> response может быть undefined
    const response = await del<RecordType | undefined>(
      `${API_BASE_URL}/${resource}/${params.id}`,
      getAuthHeaders()
    );

    const data =
      (response ? normalizeId(response) : params.previousData
        ? normalizeId(params.previousData)
        : ({ id: params.id } as RaRecord)) as RecordType;

    return { data };
  } catch (error) {
    console.error('Error in delete:', error);
    throw error;
  }
},

  async deleteMany<RecordType extends RaRecord>(
    resource: string,
    params: DeleteManyParams<RecordType>
  ): Promise<DeleteManyResult<RecordType>> {
    try {
      await Promise.all(
        params.ids.map(id => 
          del(`${API_BASE_URL}/${resource}/${id}`, getAuthHeaders())
        )
      );
      return { data: params.ids };
    } catch (error) {
      console.error('Error in deleteMany:', error);
      throw error;
    }
  }
};

export default dataProvider;