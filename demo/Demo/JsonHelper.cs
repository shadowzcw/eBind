using System.Web.Script.Serialization;

namespace Demo
{
    /// <summary>
    /// Json帮助类
    /// </summary>
    public static class JsonHelper
    {
        static readonly JavaScriptSerializer Serializer = new JavaScriptSerializer();

        /// <summary>
        /// 将一个对象转换成json格式字符串
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public static string ToJson<T>(this T t)
        {
            return Serializer.Serialize(t);
        }

        /// <summary>
        /// 将json格式字符串转换成强类型
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="json"></param>
        /// <returns></returns>
        public static T ToObject<T>(this string json)
        {
            try
            {
                return Serializer.Deserialize<T>(json);
            }
            catch (System.Exception)
            {
                return default(T);
            }
        }
    }
}